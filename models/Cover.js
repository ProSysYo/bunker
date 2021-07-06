const {Schema, model} = require('mongoose')
const {check} = require('express-validator')

const coverValidate = [
    check('name', 'Имя не может быть пустым').notEmpty(),
    check('type', 'Тип не может быть пустым').notEmpty(),
    check('type', 'Неизвестный тип накладки').isIn(['цилиндр', 'сувальда']),
]

const coverSchema = new Schema({
    name: {type: String, unique: true, required: true},
    type: {type: String, required: true, enum: ['цилиндр', 'сувальда']},
    
})

const Cover = model('Cover', coverSchema)

module.exports = { Cover, coverValidate }