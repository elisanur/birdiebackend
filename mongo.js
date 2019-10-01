const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://birdie:${password}@birdie-1meb0.mongodb.net/birdie?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const observationSchema = new mongoose.Schema({
  name: String,
  scientificName: String,
  rarity: String,
  datetime: Date,
})

const Observation = mongoose.model('Observation', observationSchema)

/* const observation = new Observation({
  name: 'Balearic shearwater',
  scientificName: 'Puffinus mauretanicus',
  rarity: 'common',
  datetime: new Date(),
})

observation.save().then(response => {
  console.log('observation saved!');
  mongoose.connection.close();
}) */

Observation.find({}).then(result => {
    result.forEach(o => {
      console.log(o)
    })
    mongoose.connection.close()
  })
  