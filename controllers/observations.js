const observationsRouter = require('express').Router()
const Observation = require('../models/observation')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    return authorization.substring(7)
  }
  return null
}

observationsRouter.get('/', async (req, res, next) => {
  try {
    const observations = await Observation
      .find({})
      .populate('user')
    // if fields should be limited, syntax: .populate('user', { username: 1, name: 1 })
    res.json(observations.map(o => o.toJSON()))
  } catch (e) {
    next(e)
  }
})

observationsRouter.get('/:id', async (req, res, next) => {
  try {
    const observation = await Observation.findById(req.params.id)
    if (observation) {
      res.json(observation.toJSON())
    } else {
      res.status(404).end()
    }
  } catch (e) {
    next(e)
  }
})

observationsRouter.delete('/:id', async (req, res, next) => {
  try {
    await Observation.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } catch (e) {
    next(e)
  }
})

observationsRouter.post('/', async (req, res, next) => {
  const { body } = req
  const token = getTokenFrom(req)

  try {
    const decodedToken = jwt.verify(token, config.SECRET)
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }


    const user = await User.findById(decodedToken.id)

    if (!body.name) {
      return res.status(400).json({
        error: 'name missing'
      })
    }

    if (!body.scientificName) {
      return res.status(400).json({
        error: 'scientific name missing'
      })
    }

    if (!body.rarity) {
      return res.status(400).json({
        error: 'rarity missing'
      })
    }

    const observation = new Observation({
      name: body.name,
      scientificName: body.scientificName,
      rarity: body.rarity,
      datetime: new Date(),
      user: user._id
    })

    const savedObservation = await observation.save()
    user.observations = user.observations.concat(savedObservation._id)
    await user.save()
    res.json(savedObservation.toJSON())

  } catch (e) {
    next(e)
  }
})

observationsRouter.put('/:id', (req, res, next) => {
  const body = req.body

  const observation = {
    name: body.name,
    scientificName: body.scientificName,
    rarity: body.rarity
  }

  Observation.findByIdAndUpdate(req.params.id, observation, { new: true })
    .then(updatedObservation => {
      res.json(updatedObservation.toJSON())
    })
    .catch(error => next(error))
})

module.exports = observationsRouter