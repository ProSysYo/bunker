const { validationResult } = require("express-validator")

const { FormatError } = require("../utils/format-error")

const { Partisanship } = require("../models/Partisanship")

class partisanshipController {
    async add(req, res) {
        try {
            const errors = validationResult(req)
            
            if (!errors.isEmpty()) {
                const formatedErrors = FormatError(errors)                
                return res.status(400).json({message: "Ошибка валидации", errors: formatedErrors})
            }

            const { name } = req.body

            const findPartisanship = await Partisanship.findOne({name})

            if (findPartisanship) { 
                return res.status(403).json({message: 'Такая партийность уже существует'})
            }

            const newPartisanship = new Partisanship({name})

            const partisanship = await newPartisanship.save()

            return res.status(200).json({message: 'Новая партийность добавлена', partisanship})
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Ошибка при добавлении партийности', e})
        }
    }

    async getAll(req, res) {
        try {            
            const partisanships = await Partisanship.find().sort({name: 1}).exec()
            return res.json(partisanships)
        } catch (e) {
            res.status(400).json({message: 'Ошибка при получении партийностей', e})
        }
    }

    async getById(req, res) {
        try {
            const id = req.params.id           
            const partisanship = await Partisanship.findById(id)

            if (!partisanship) {
                return res.status(400).json({message: 'Такая партийность не найдена'})
            }
            return res.json(partisanship)
        } catch (e) {
            res.status(400).json({message: 'Ошибка при получении партийности', e})
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id

            const partisanship = await Partisanship.findOneAndDelete({_id: id})

            if (!partisanship) {
                return res.status(400).json({message: 'Нет такой партийности для удаления'})
            }

            res.status(200).json({message: 'Партийность удалена'})
        } catch (e) {
            res.status(400).json({message: 'Ошибка при удалении партийности', e})
        }
    }

    async update(req, res) {
        try {
            const errors = validationResult(req)
            
            if (!errors.isEmpty()) {
                const formatedErrors = FormatError(errors)                
                return res.status(400).json({message: "Ошибка валидации", errors: formatedErrors})
            }
            
            const partisanship = await Partisanship.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true})
            if (!partisanship) {
                return res.status(400).json({message: 'Нет такой партийности для изменения'})
            }

            res.status(200).json({message: 'Данные партийности изменены', partisanship})
        } catch (e) {
            res.status(400).json({message: 'Ошибка при изменении партийности', e})
        }
    }
}

module.exports = new partisanshipController()