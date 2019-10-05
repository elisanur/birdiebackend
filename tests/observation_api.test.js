const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Observation = require('../models/observation')
const User = require('../models/user')

beforeEach(async () => {
  await Observation.deleteMany({})
  await Observation.insertMany(helper.initialObservations)
  await User.deleteMany({})
  await api
    .post('/api/users')
    .send({ username: 'root', password: 'sekret' })
})
//another option for beforeEach:
/* beforeEach(async () => {
  await Observation.remove({})

  const obObjects = helper.initialObservations
    .map(n => new Observation(n))
  const promiseArray = obObjects.map(n => n.save())
  await Promise.all(promiseArray)
}) */
// Or this way:
/* beforeEach(async () => {
  await Observation.remove({})

  for (let o of initialObservations) {
    let obObject = new Observation(o)
    await obObject.save()
  }
}) */
describe('when there is initially some observations saved', () => {
  test('observations are returned as json', async () => {
    await api
      .get('/api/observations')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all observations are returned', async () => {
    const response = await api.get('/api/observations')

    expect(response.body.length).toBe(helper.initialObservations.length)
  })

  test('a specific observation is within the returned observations', async () => {
    const response = await api.get('/api/observations')

    const names = response.body.map(r => r.name)

    expect(names).toContain('Avocet')
  })
})

describe('viewing a specific observation', () => {
  test('succeeds with a valid id', async () => {
    const obsAtStart = await helper.observationsInDb()

    const obToView = obsAtStart[0]

    const resultOb = await api
      .get(`/api/observations/${obToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    // All fields are tested separately with expect.
    // If datetime didn't cause type errors a shorter form would be:
    // expect(resultNote.body).toEqual(noteToView)
    expect(resultOb.body.rarity).toEqual(obToView.rarity)
    expect(resultOb.body.name).toEqual(obToView.name)
    expect(resultOb.body.scientificName).toEqual(obToView.scientificName)
    expect(resultOb.body.id).toEqual(obToView.id)
    expect(new Date(resultOb.body.datetime)).toEqual(obToView.datetime)
  })

  test('fails with statuscode 404 if observation does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()
    await api
      .get(`/api/observations/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with statuscode 400 if id is invalid', async () => {
    const invalidId = 'sdlskdlskd9458945894'
    await api
      .get(`/api/observations/${invalidId}`)
      .expect(400)
  })
})

describe('addition of a new observation', () => {
  test('succeeds with valid data', async () => {
    const newObservation = {
      name: 'Bluethroat',
      scientificName: 'Luscinia svecica',
      rarity: 'extremely rare',
      datetime: new Date()
    }

    let response = await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' })

    let { token } = JSON.parse(response.res.text)

    await api
      .post('/api/observations')
      .set('Authorization', 'bearer ' + token)
      .send(newObservation)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const observationsAtEnd = await helper.observationsInDb()
    expect(observationsAtEnd.length).toBe(helper.initialObservations.length + 1)

    const names = observationsAtEnd.map(r => r.name)
    expect(names).toContain(
      'Bluethroat'
    )
  })
})

describe('deletion of an observation', () => {
  test('an observation can be deleted', async () => {
    const obsAtStart = await helper.observationsInDb()
    const obToDelete = obsAtStart[0]

    await api
      .delete(`/api/observations/${obToDelete.id}`)
      .expect(204)

    const obsAtEnd = await helper.observationsInDb()

    expect(obsAtEnd.length).toBe(helper.initialObservations.length - 1)

    const names = obsAtEnd.map(r => r.name)
    expect(names).not.toContain(obToDelete.name)
  })
})

describe('when there is initially one user at db', () => {
  

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'elisaadmin',
      name: 'Elisa Nurmi',
      password: 'sekred',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})