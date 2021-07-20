const {Schema, model} = require('mongoose')
const {check} = require('express-validator')

const partisanshipValidate = [
    check('name', 'Не может быть пустым').notEmpty(),     
]

const partisanshipLocationSchema = new Schema({
    name: {type: String, unique: true, required: true},
})

const Partisanship = model('Partisanship', partisanshipLocationSchema)

module.exports = { Partisanship, partisanshipValidate }