/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
// eslint-disable-next-line no-undef
const PORT = process.env.PORT
const Person = require('./models/person')

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}!`)
})

app.get('/api/persons', (req,res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

function formattedDate(date) {

    var dateString = date.toLocaleDateString('en-US', { month: 'short', weekday: 'short', day: '2-digit', year: 'numeric' })
    var timeString = date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' , timeZoneName: 'long' })

    var formattedDate = dateString + ' ' + timeString

    formattedDate = formattedDate.replace(/,/g, '')

    return formattedDate
}



app.get('/info', async (req,res) => {
    const personsLength = await Person.countDocuments({})
    const currentDate = new Date()
    res.send(`<h1>Info page</h1>
    <p>Phonebook currently has info for ${personsLength} people.</h1>
    <p>Last updated: ${formattedDate(currentDate)}</p>`
    )
})

app.get('/api/persons/:id', (req,res,next) => {
    Person
        .findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person)
            } else {
                res.status(400).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req,res,next) => {
    Person
        .findByIdAndDelete(req.params.id)
        .then(_result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons/', (req,res,next) => {
    const body = req.body

    if (!body.name) {
        return res.status(400).json({
            error: 'Name cannot be empty'
        })
    } else if (!body.number) {
        return res.status(400).json({
            error: 'Number cannot be empty'
        })
    }
    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        res.json(savedPerson)
    })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (req,res,next) => {
    const body = req.body
    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(error => next(error))
})

const requestLogger = (req, res, next) => {
    console.log('Method: ', req.method)
    console.log('Path: ', req.path)
    console.log('Body: ', req.body)
    console.log('----')
    next()
}

app.use(requestLogger)

morgan.token('body', function (req, res) {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body'))

const unknownEndpoint = (req,res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)