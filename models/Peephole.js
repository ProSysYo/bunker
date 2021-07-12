const {Schema, model} = require('mongoose')
const {check} = require('express-validator')

const peepholeValidate = [
    check('name', 'Не может быть пустым').notEmpty(),
    check('originalName', 'Не может быть пустым').notEmpty(),    
]

const peepholeSchema = new Schema({
    name: {type: String, unique: true, required: true},
    originalName: {type: String, unique: true, required: true},
})

const Peephole = model('Peephole', peepholeSchema)

module.exports = { Peephole, peepholeValidate }