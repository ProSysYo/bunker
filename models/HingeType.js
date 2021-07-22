const {Schema, model} = require('mongoose')
const {check} = require('express-validator')

const hingeTypeValidate = [
    check('name', 'Не может быть пустым').notEmpty(),     
]

const hingeTypeSchema = new Schema({
    name: {type: String, unique: true, required: true},
})

const HingeType = model('HingeType', hingeTypeSchema)

module.exports = { HingeType, hingeTypeValidate }