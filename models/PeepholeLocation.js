const {Schema, model} = require('mongoose')
const {check} = require('express-validator')

const peepholeLocationValidate = [
    check('name', 'Не может быть пустым').notEmpty(),     
]

const peepholeLocationSchema = new Schema({
    name: {type: String, unique: true, required: true},
})

const PeepholeLocation = model('PeepholeLocation', peepholeLocationSchema)

module.exports = { PeepholeLocation, peepholeLocationValidate }