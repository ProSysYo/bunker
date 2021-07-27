const {Schema, model} = require('mongoose')
const {check} = require('express-validator')

const packagingValidate = [
    check('name', 'Не может быть пустым').notEmpty(),
    check('owner', 'Не может быть пустым').notEmpty(),    
]

const packagingSchema = new Schema({
    name: {type: String, unique: true, required: true},
    owner: {type: String, unique: true, required: true},
})

const Packaging = model('Packaging', packagingSchema)

module.exports = { Packaging, packagingValidate }