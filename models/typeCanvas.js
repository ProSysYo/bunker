//Модель типа полотен
const {Schema, model} = require('mongoose')
const {check} = require('express-validator')

const typeCanvasValidate = [
    check('value', 'Не должно быть пустым').notEmpty(),
    check('description', 'Не должно быть пустым').notEmpty(),
    check('trimOutside', 'Неизвестный тип отделки снаружи').isIn(['металл', 'панель']),
    check('trimInside', 'Неизвестный тип отделки внутри').isIn(['металл', 'панель']),
]

const typeCanvaslSchema = new Schema({
    value: {type: String, unique: true, required: true},
    description: {type: String, unique: true, required: true},
    trimOutside: {type: String, required: true, enum: ['металл', 'панель']},//Отделка снаружи
    trimInside: {type: String, required: true, enum: ['металл', 'панель']},//Отделка внутри
})

const TypeCanvas = model('TypeCanvas', typeCanvaslSchema)

module.exports = { TypeCanvas, typeCanvasValidate }