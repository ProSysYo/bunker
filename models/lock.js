const {Schema, model} = require('mongoose')
const {check} = require('express-validator')

const lockValidate = [
    check('name', 'Имя не должно быть пустым').notEmpty(),
    check('type', 'Тип не должен быть пустым').notEmpty(),
    check('type', 'Неизвестный тип замка').isIn(['Цилиндр', 'Сувальда', 'Двухсистемный']),
    check('insertPlace', 'Место установки не известно').isIn(['Основной', 'Дополнительный', 'Комбинированный']),
    check('isLatch', 'Выберите предусмотрена ли задвижка замка').isBoolean()
]

const locklSchema = new Schema({
    name: {type: String, unique: true, required: true},    
    type: {type: String, required: true, enum: ['Цилиндр', 'Сувальда', 'Двухсистемный']},
    insertPlace: {type: String, required: true, enum: ['Основной', 'Дополнительный', 'Комбинированный']},
    isLatch: {type: Boolean, required: true} //Засов есть по конструктиву?
})

const Lock = model('Lock', locklSchema)

module.exports = { Lock, lockValidate }