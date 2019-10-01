const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

app.use(bodyParser.json())

const cors = require('cors')
app.use(cors())

const requestLogger = (req, res, next) => {
    console.log('Method:', req.method)
    console.log('Path:  ', req.path)
    console.log('Body:  ', req.body)
    console.log('---')
    next()
}

app.use(requestLogger)
app.use(express.static('build'))


const url =
  `mongodb+srv://birdie:birdiepass@birdie-1meb0.mongodb.net/birdie?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const observationSchema = new mongoose.Schema({
  name: String,
  scientificName: String,
  rarity: String,
  datetime: Date,
})

const Observation = mongoose.model('Observation', observationSchema)

/* let observations = [

    {
        id: 1,
        name: "Avocet",
        scientificName: "Recurvirostra avosetta",
        notes: [],
        datetime: "",
        rarity: "",
        geolocations: "",
        other: ""
    },
    {
        id: 2,
        name: "Balearic shearwater",
        scientificName: "Puffinus mauretanicus",
        notes: [],
        datetime: "",
        rarity: "",
        geolocations: "",
        other: ""
    },
    {
        id: 3,
        name: "Capercaillie",
        scientificName: "Tetrao urogallus",
        notes: [],
        datetime: "",
        rarity: "",
        geolocations: "",
        other: ""
    }

] */


app.get('/api', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/observations', (req, res) => {
    Observation.find({}).then(observations => {
        res.json(observations)
    })
})

app.get('/api/observations/:id', (req, res) => {
    const id = Number(req.params.id)
    const observation = observations.find(observation => observation.id === id)

    if (observation) {
        res.json(observation)
    } else {
        res.status(404).end()
    }

})

app.delete('/api/observations/:id', (req, res) => {
    const id = Number(req.params.id)
    observations = observations.filter(observation => observation.id !== id)
    res.status(204).end()
})

app.post('/api/observations', (req, res) => {
    const body = req.body

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

    const observation = {
        name: body.name,
        scientificName: body.scientificName,
        rarity: body.rarity,
        datetime: new Date(),
        id: generateId(),
    }

    observations = observations.concat(observation)

    res.json(observation)
})

const generateId = () => {
    const maxId = observations.length > 0
        ? Math.max(...observations.map(o => o.id))
        : 0

    return maxId + 1
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3004
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
