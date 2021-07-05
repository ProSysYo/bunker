const { validationResult } = require("express-validator")

const { FormatError } = require("../utils/format-error")

const { PadColor } = require("../models/PadColor")

class padColorController {
    async add(req, res) {
        try {
            const errors = validationResult(req)
            
            if (!errors.isEmpty()) {
                const formatedErrors = FormatError(errors)                
                return res.status(400).json({message: "Ошибка валидации", errors: formatedErrors})
            }

            const { shortName, fullName } = req.body

            const findColor = await PadColor.findOne({shortName})

            if (findColor) {
                return res.status(403).json({message: 'Такой цвет накладки уже существует'})
            }

            const newColor = new PadColor({shortName, fullName})

            const padColor = await newColor.save()

            return res.status(200).json({message: 'Новый цвет накладки добавлен', padColor})
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Ошибка при добавлении цвета накладки', e})
        }
    }

    async getAll(req, res) {
        try {            
            const padColors = await PadColor.find().sort({shortName: 1}).exec()
            return res.json(padColors)
        } catch (e) {
            res.status(400).json({message: 'Ошибка при получении цветов накладок', e})
        }
    }

    async getById(req, res) {
        try {
            const id = req.params.id           
            const padColor = await PadColor.findById(id)

            if (!padColor) {
                return res.status(400).json({message: 'Цвет накладки не найден'})
            }
            return res.json(padColor)
        } catch (e) {
            res.status(400).json({message: 'Ошибка при получении цвета накладки', e})
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id

            const padColor = await PadColor.findOneAndDelete({_id: id})

            if (!padColor) {
                return res.status(400).json({message: 'Нет такого цвета накладки для удаления'})
            }

            res.status(200).json({message: 'Цвет накладки удален'})
        } catch (e) {
            res.status(400).json({message: 'Ошибка при удалении цвета накладки', e})
        }
    }

    async update(req, res) {
        try {
            const errors = validationResult(req)
            
            if (!errors.isEmpty()) {
                const formatedErrors = FormatError(errors)                
                return res.status(400).json({message: "Ошибка валидации", errors: formatedErrors})
            }
            
            const padColor = await PadColor.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true})
            if (!padColor) {
                return res.status(400).json({message: 'Нет такого цвета накладки для изменения'})
            }

            res.status(200).json({message: 'Данные цвета накладки изменены', padColor})
        } catch (e) {
            res.status(400).json({message: 'Ошибка при изменении цвета накладки', e})
        }
    }
}

module.exports = new padColorController()