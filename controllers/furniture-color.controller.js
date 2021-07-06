const { validationResult } = require("express-validator")

const { FormatError } = require("../utils/format-error")

const { FurnitureColor } = require("../models/FurnitureColor")

class furnitureColorController {
    async add(req, res) {
        try {
            const errors = validationResult(req)
            
            if (!errors.isEmpty()) {
                const formatedErrors = FormatError(errors)                
                return res.status(400).json({message: "Ошибка валидации", errors: formatedErrors})
            }

            const { shortName, fullName } = req.body

            const color = await FurnitureColor.findOne({shortName})

            if (color) {
                return res.status(403).json({message: 'Такой цвет фурнитуры уже существует'})
            }

            const newColor = new FurnitureColor({shortName, fullName})

            const furnitureColor = await newColor.save()

            return res.status(200).json({message: 'Новый цвет фурнитуры добавлен', furnitureColor})
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Ошибка при добавлении цвета фурнитуры', e})
        }
    }

    async getAll(req, res) {
        try {            
            const furnitureColors = await FurnitureColor.find().sort({shortName: 1}).exec()
            return res.json(furnitureColors)
        } catch (e) {
            res.status(400).json({message: 'Ошибка при получении цветов фурнитуры', e})
        }
    }

    async getById(req, res) {
        try {
            const id = req.params.id           
            const furnitureColor = await FurnitureColor.findById(id)

            if (!furnitureColor) {
                return res.status(400).json({message: 'Цвет фурнитуры не найден'})
            }
            return res.json(furnitureColor)
        } catch (e) {
            res.status(400).json({message: 'Ошибка при получении цвета фурнитуры', e})
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id

            const furnitureColor = await FurnitureColor.findOneAndDelete({_id: id})

            if (!furnitureColor) {
                return res.status(400).json({message: 'Нет такого цвета фурнитуры для удаления'})
            }

            res.status(200).json({message: 'Цвет фурнитуры удален'})
        } catch (e) {
            res.status(400).json({message: 'Ошибка при удалении цвета фурнитуры', e})
        }
    }

    async update(req, res) {
        try {
            const errors = validationResult(req)
            
            if (!errors.isEmpty()) {
                const formatedErrors = FormatError(errors)                
                return res.status(400).json({message: "Ошибка валидации", errors: formatedErrors})
            }
            
            const furnitureColor = await FurnitureColor.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true})
            if (!furnitureColor) {
                return res.status(400).json({message: 'Нет такого цвета фурнитуры для изменения'})
            }

            res.status(200).json({message: 'Данные цвета фурнитуры изменены', furnitureColor})
        } catch (e) {
            res.status(400).json({message: 'Ошибка при изменении цвета фурнитуры', e})
        }
    }
}

module.exports = new furnitureColorController()