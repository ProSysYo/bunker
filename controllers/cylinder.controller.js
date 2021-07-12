const { validationResult } = require("express-validator")

const { FormatError } = require("../utils/format-error")

const { Cylinder } = require("../models/Cylinder")

class cylinderController {
    async add(req, res) {
        try {
            const errors = validationResult(req)
            
            if (!errors.isEmpty()) {
                const formatedErrors = FormatError(errors)                
                return res.status(400).json({message: "Ошибка валидации", errors: formatedErrors})
            }

            const { name, originalName } = req.body

            const findCylinder = await Cylinder.findOne({name})

            if (findCylinder) {
                return res.status(403).json({message: 'Такой цилиндр уже существует'})
            }

            const newCylinder = new Cylinder({name, originalName})

            const cylinder = await newCylinder.save()

            return res.status(200).json({message: 'Новый цилиндр добавлен', cylinder})
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Ошибка при добавлении цилиндра', e})
        }
    }

    async getAll(req, res) {
        try {            
            const cylinders = await Cylinder.find().sort({name: 1}).exec()
            return res.json(cylinders)
        } catch (e) {
            res.status(400).json({message: 'Ошибка при получении цилиндров', e})
        }
    }

    async getById(req, res) {
        try {
            const id = req.params.id           
            const cylinder = await Cylinder.findById(id)

            if (!cylinder) {
                return res.status(400).json({message: 'Цилиндр не найден'})
            }
            return res.json(cylinder)
        } catch (e) {
            res.status(400).json({message: 'Ошибка при получении цилиндра', e})
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id

            const cylinder = await Cylinder.findOneAndDelete({_id: id})

            if (!cylinder) {
                return res.status(400).json({message: 'Нет такого цилиндра для удаления'})
            }

            res.status(200).json({message: 'Цилиндр удален'})
        } catch (e) {
            res.status(400).json({message: 'Ошибка при удалении цилиндра', e})
        }
    }

    async update(req, res) {
        try {
            const errors = validationResult(req)
            
            if (!errors.isEmpty()) {
                const formatedErrors = FormatError(errors)                
                return res.status(400).json({message: "Ошибка валидации", errors: formatedErrors})
            }
            
            const cylinder = await Cylinder.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true})
            if (!cylinder) {
                return res.status(400).json({message: 'Нет такого цилиндра для изменения'})
            }

            res.status(200).json({message: 'Данные цидиндра изменены', cylinder})
        } catch (e) {
            res.status(400).json({message: 'Ошибка при изменении цилиндра', e})
        }
    }
}

module.exports = new cylinderController()