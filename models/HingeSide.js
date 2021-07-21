const {Schema, model} = require('mongoose')
const {check} = require('express-validator')

const hingeSideValidate = [
    check('name', 'Не может быть пустым').notEmpty(),     
]

const hingeSideSchema = new Schema({
    name: {type: String, unique: true, required: true},
})

const HingeSide = model('HingeSide', hingeSideSchema)

module.exports = { HingeSide, hingeSideValidate }