const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {

    response
      .status(400)
      .send({ error: '`username` to be unique' })

    next(exception)
  }
})

/* ONLY FOR LOCAL DEV USE / WILL SHOW PUBLICLY USERS
usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('observations')
    // if fields should be limited, syntax example: .populate('observations', { name: 1, scientificName: 1, rarity: 1})
  response.json(users.map(u => u.toJSON()))
})
*/
module.exports = usersRouter