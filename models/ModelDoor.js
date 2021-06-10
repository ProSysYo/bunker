const {Schema, model} = require('mongoose')
const {check} = require('express-validator')

const modelDoorValidate = [
    check('abbreviation', 'Сокращение модели не может быть пустым').notEmpty(),
    check('name', 'Имя модели не может быть пустым').notEmpty()
]

const modelDoorSchema = new Schema({
    abbreviation: {type: String, unique: true, required: true},
    name: {type: String, unique: true, required: true}
})

const ModelDoor = model('ModelDoor', modelDoorSchema)

module.exports = { ModelDoor, modelDoorValidate }