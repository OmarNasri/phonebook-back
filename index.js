const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Person = require('./models/person')
const app = express()


const formatPerson = (person) => {
    return {
    name: person.name,
    number: person.number,
    id: person.id
    }
  }

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Martti Tienari",
        number: "040-123456",
        id: 2
    },
    {
        name: "Arto Järvinen",
        number: "040-123456",
        id: 3
    },
    {
        name: "Lea Kutvonen",
        number: "040-123456",
        id: 4
    }
  ]
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))


app.get('/api/persons', (request, response) => {
    Person
        .find({})
        .then(persons => {
        response.json(persons.map(formatPerson))
        })
      })



app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(persons => persons.id === id)
    if(person){
        response.json(person)
    } else {
        response.status(404).end()
    }
  })


app.delete('/api/persons/:id', (request, response) => {
Person
    .findByIdAndRemove(request.params.id)
    .then(result => {
    response.status(204).end()
    })
    .catch(error => {
    response.status(400).send({ error: 'Wrong id' })
    })
})
      

app.post('/api/persons', (request, response) => {
    const body = request.body   
    if(!body.name || !body.number){
        return response.status(400).json({
            error: 'name or number missing'
        })
    }
    const person = new Person({
        name: body.name,
        number: body.number
    })
    person
        .save()
        .then(savedPerson => {
            response.json(formatPerson(savedPerson))
        })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
