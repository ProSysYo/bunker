const {Schema, model} = require('mongoose')
const {check} = require('express-validator')

const lockValidate = [
    check('name', 'Имя не должно быть пустым').notEmpty(),
    check('type', 'Тип не должен быть пустым').notEmpty()
]

const locklSchema = new Schema({
    name: {type: String, unique: true, required: true},    
    type: {type: String, required: true, enum: ['Основной', 'Дополнительный', 'Кобинированный']}
})

const Lock = model('Lock', locklSchema)

module.exports = { Lock, lockValidate }