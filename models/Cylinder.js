const {Schema, model} = require('mongoose')
const {check} = require('express-validator')

const cylinderValidate = [
    check('name', 'Имя не может быть пустым').notEmpty(),
    check('originalName', 'Тип не может быть пустым').notEmpty(),    
]

const cylinderSchema = new Schema({
    name: {type: String, unique: true, required: true},
    originalName: {type: String, unique: true, required: true},
})

const Cylinder = model('Cylinder', cylinderSchema)

module.exports = { Cylinder, cylinderValidate }