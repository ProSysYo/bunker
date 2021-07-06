const {Schema, model} = require('mongoose')
const {check} = require('express-validator')

const furnitureColorValidate = [
    check('shortName', 'Введите короткое имя цвета фурнитуры').notEmpty(),
    check('fullName', 'Введите полное имя цвета фурнитуры').notEmpty()
]

const furnitureColorSchema = new Schema({
    shortName: {type: String, unique: true, required: true},
    fullName: {type: String, unique: true, required: true}
})

const FurnitureColor = model('FurnitureColor', furnitureColorSchema)

module.exports = { FurnitureColor, furnitureColorValidate }