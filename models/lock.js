const {Schema, model} = require('mongoose')
const {check} = require('express-validator')

const lockValidate = [
    check('name', 'Имя не должно быть пустым').notEmpty(),
    check('type', 'Тип не должен быть пустым').notEmpty(),
    check('type', 'Неизвестный тип замка').isIn(['Основной', 'Дополнительный', 'Двухсистемный']),
    check('isLatch', 'Выберите предусмотрена ли задвижка замка').isBoolean()
]

const locklSchema = new Schema({
    name: {type: String, unique: true, required: true},    
    type: {type: String, required: true, enum: ['Основной', 'Дополнительный', 'Двухсистемный']},
    isLatch: {type: Boolean, required: true} //Засов есть по конструктиву?
})

const Lock = model('Lock', locklSchema)

module.exports = { Lock, lockValidate }