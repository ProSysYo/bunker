const {Schema, model} = require('mongoose')
const {check} = require('express-validator')

const handleValidate = [
    check('name', 'Не может быть пустым').notEmpty(),
    check('originalName', 'Не может быть пустым').notEmpty(),    
]

const handleSchema = new Schema({
    name: {type: String, unique: true, required: true},
    originalName: {type: String, unique: true, required: true},
})

const Handle = model('Handle', handleSchema)

module.exports = { Handle, handleValidate }