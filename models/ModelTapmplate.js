const {Schema, model} = require('mongoose')
const {check} = require('express-validator')

const modelValidate = [
    check('field1', 'Описание').notEmpty(),
    check('field2', 'Описание').notEmpty()
]

const modelSchema = new Schema({
    field1: {type: String, unique: true, required: true},
    field2: {type: String, unique: true, required: true}
})

const Model = model('Model', modelSchema)

module.exports = { Model, modelValidate }