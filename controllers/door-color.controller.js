const { validationResult } = require("express-validator")

const { FormatError } = require("../utils/format-error")

const { DoorColor } = require("../models/DoorColor")

class doorColorController {
    async add(req, res) {
        try {
            const errors = validationResult(req)
            
            if (!errors.isEmpty()) {
                const formatedErrors = FormatError(errors)                
                return res.status(400).json({message: "Ошибка валидации", errors: formatedErrors})
            }

            const { name } = req.body

            const findDoorColor = await DoorColor.findOne({name})

            if (findDoorColor) { 
                return res.status(403).json({message: 'Такой цвет уже существует'})
            }

            const newDoorColor = new DoorColor({name})

            const doorColor = await newDoorColor.save()

            return res.status(200).json({message: 'Новый цвет добавлен', doorColor})
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Ошибка при добавлении цвет', e})
        }
    }

    async getAll(req, res) {
        try {            
            const doorColors = await DoorColor.find().sort({name: 1}).exec()
            return res.json(doorColors)
        } catch (e) {
            res.status(400).json({message: 'Ошибка при получении цветов дверей', e})
        }
    }

    async getById(req, res) {
        try {
            const id = req.params.id           
            const doorColor = await DoorColor.findById(id)

            if (!doorColor) {
                return res.status(400).json({message: 'Такой цвет не найден'})
            }
            return res.json(doorColor)
        } catch (e) {
            res.status(400).json({message: 'Ошибка при получении цвета двери', e})
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id

            const doorColor = await DoorColor.findOneAndDelete({_id: id})

            if (!doorColor) {
                return res.status(400).json({message: 'Нет такого цвета для удаления'})
            }

            res.status(200).json({message: 'Цвет двери удален'})
        } catch (e) {
            res.status(400).json({message: 'Ошибка при удалении цвета двери', e})
        }
    }

    async update(req, res) {
        try {
            const errors = validationResult(req)
            
            if (!errors.isEmpty()) {
                const formatedErrors = FormatError(errors)                
                return res.status(400).json({message: "Ошибка валидации", errors: formatedErrors})
            }
            
            const doorColor = await DoorColor.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true})
            if (!doorColor) {
                return res.status(400).json({message: 'Нет такого цвета двери для изменения'})
            }

            res.status(200).json({message: 'Данные цвета двери изменены', doorColor})
        } catch (e) {
            res.status(400).json({message: 'Ошибка при изменении цвета двери', e})
        }
    }
}

module.exports = new doorColorController()