const {Schema, model} = require('mongoose')
const {check} = require('express-validator')

const padColorValidate = [
    check('shortName', 'Введите короткое имя цвета налкладки').notEmpty(),
    check('fullName', 'Введите полное имя цвета наладки').notEmpty()
]

const padColorSchema = new Schema({
    shortName: {type: String, unique: true, required: true},
    fullName: {type: String, unique: true, required: true}
})

const PadColor = model('PadColor', padColorSchema)

module.exports = { PadColor, padColorValidate }