const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')

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

app.get('/api/persons', (req, res) => {
    res.json(persons)
})
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
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

//Toimivuus testatu REST clientillä.
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })    

app.post('/api/persons', (request, response) => {
  const rID = Math.floor(Math.random() * 100000000);
  const body = request.body
  const exists = persons.find(persons => persons.name === body.name)
  const person = {
    name: body.name,
    number: body.number,
    id: rID
    }
  
    if(person.name === undefined || person.number === undefined){
        return response.status(400).json({ error: 'content missing' })
        }
    if(exists){
        return response.status(400).json({ error: 'name must be unique' })
        }
    
    persons = persons.concat(person)   
    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
