const {Schema, model} = require('mongoose')
const {check} = require('express-validator')

const doorColorValidate = [
    check('name', 'Не может быть пустым').notEmpty(),     
]

const doorColorSchema = new Schema({
    name: {type: String, unique: true, required: true},
})

const DoorColor = model('DoorColor', doorColorSchema)

module.exports = { DoorColor, doorColorValidate }