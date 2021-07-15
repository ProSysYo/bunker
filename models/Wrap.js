const {Schema, model} = require('mongoose')
const {check} = require('express-validator')

const wrapValidate = [
    check('name', 'Не может быть пустым').notEmpty(),
    check('originalName', 'Не может быть пустым').notEmpty(),    
]

const wrapSchema = new Schema({
    name: {type: String, unique: true, required: true},
    originalName: {type: String, unique: true, required: true},
})

const Wrap = model('Wrap', wrapSchema)

module.exports = { Wrap, wrapValidate }