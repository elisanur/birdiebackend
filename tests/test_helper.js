const Observation = require('../models/observation')
const User = require('../models/user')

const initialObservations =  [

  {
    name: 'Avocet',
    scientificName: 'Recurvirostra avosetta',
    rarity: 'common',
    datetime: new Date()
  },
  {
    name: 'Balearic shearwater',
    scientificName: 'Puffinus mauretanicus',
    rarity: 'rare',
    datetime: new Date()
  },
  {
    name: 'Capercaillie',
    scientificName: 'Tetrao urogallus',
    rarity: 'extremely rare',
    datetime: new Date()
  }
]

const nonExistingId = async () => {
  const obs = new Observation({ name: 'willremovethissoon' })
  await obs.save()
  await obs.remove()

  return obs._id.toString()
}

const observationsInDb = async () => {
  const obs = await Observation.find({})
  return obs.map(ob => ob.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialObservations,
  nonExistingId,
  observationsInDb,
  usersInDb
}