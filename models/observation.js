const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)


const observationSchema = new mongoose.Schema({
  name: String,
  scientificName: String,
  rarity: String,
  datetime: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

observationSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Observation', observationSchema)
