const {Schema, model} = require('mongoose')
const {check} = require('express-validator')

const boltValidate = [
    check('name', 'Имя не может быть пустым').notEmpty(),
    check('type', 'Тип не может быть пустым').notEmpty(),
    check('type', 'Неизвестный тип накладки').isIn(['цилиндр', 'сувальда']),
]

const boltSchema = new Schema({
    name: {type: String, unique: true, required: true},
    type: {type: String, required: true, enum: ['цилиндр', 'сувальда']},
    
})

const Bolt = model('Bolt', boltSchema)

module.exports = { Bolt, boltValidate }