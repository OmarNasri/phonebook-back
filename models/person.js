const mongoose = require('mongoose')

const url = 'mongodb+srv://admin:admin1@contacts.06oow.mongodb.net/fullstack-persons'

mongoose.connect(url)

const Person = mongoose.model('Person', {
    name: String,
    number: String,
    ID: Number
  })


  module.exports = Person