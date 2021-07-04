const {Schema, model} = require('mongoose')
const {check} = require('express-validator')

const modelDoorValidate = [
    check('abbreviation', 'Сокращение модели не может быть пустым').notEmpty(),    
    check('trimOutside', 'Неизвестный тип отделки снаружи').isIn(['металл', 'панель']),
    check('trimInside', 'Неизвестный тип отделки внутри').isIn(['металл', 'панель']),
    check('isDoubleDoors', 'Выберите да или нет').isBoolean(),
    check('insulation', 'Неизвестный тип уплотнителя').isIn(['пенопласт', 'базальт']),
    check('countContour', 'Должно быть выбрано число').isNumeric(),
    check('countContour', 'Неизвестное количество конутров').isIn([1, 2, 3])
]

const modelDoorSchema = new Schema({
    abbreviation: {type: String, unique: true, required: true},//Сокращение    
    trimOutside: {type: String, required: true, enum: ['металл', 'панель']},//Отделка снаружи
    trimInside: {type: String, required: true, enum: ['металл', 'панель']},//Отделка внутри
    isDoubleDoors: {type: Boolean, required: true},//Двустворчатая
    insulation: {type: String, enum: ['пенопласт', 'базальт']},//Утеплитель
    countContour: {type: Number, required: true, enum: [1, 2, 3]},
})

const ModelDoor = model('ModelDoor', modelDoorSchema)

module.exports = { ModelDoor, modelDoorValidate }