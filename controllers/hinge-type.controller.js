const { validationResult } = require("express-validator")

const { FormatError } = require("../utils/format-error")

const { HingeType } = require("../models/HingeType")

class hingeTypeController {
    async add(req, res) {
        try {
            const errors = validationResult(req)
            
            if (!errors.isEmpty()) {
                const formatedErrors = FormatError(errors)                
                return res.status(400).json({message: "Ошибка валидации", errors: formatedErrors})
            }

            const { name } = req.body

            const findHingeType = await HingeType.findOne({name})

            if (findHingeType) { 
                return res.status(403).json({message: 'Такой тип петель уже существует'})
            }

            const newHingeType = new HingeType({name})

            const hingeType = await newHingeType.save()

            return res.status(200).json({message: 'Новый тип петель добавлен', hingeType})
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Ошибка при добавлении типа петель', e})
        }
    }

    async getAll(req, res) {
        try {            
            const hingeTypes = await HingeType.find().sort({name: 1}).exec()
            return res.json(hingeTypes)
        } catch (e) {
            res.status(400).json({message: 'Ошибка при получении сторонностей петель', e})
        }
    }

    async getById(req, res) {
        try {
            const id = req.params.id           
            const hingeType = await HingeType.findById(id)

            if (!hingeType) {
                return res.status(400).json({message: 'Такой тип петель не найден'})
            }
            return res.json(hingeType)
        } catch (e) {
            res.status(400).json({message: 'Ошибка при получении типа петель', e})
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id

            const hingeType = await HingeType.findOneAndDelete({_id: id})

            if (!hingeType) {
                return res.status(400).json({message: 'Нет такго типа петель для удаления'})
            }

            res.status(200).json({message: 'Тип петель удален'})
        } catch (e) {
            res.status(400).json({message: 'Ошибка при удалении типа петель', e})
        }
    }

    async update(req, res) {
        try {
            const errors = validationResult(req)
            
            if (!errors.isEmpty()) {
                const formatedErrors = FormatError(errors)                
                return res.status(400).json({message: "Ошибка валидации", errors: formatedErrors})
            }
            
            const hingeType = await HingeType.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true})
            if (!hingeType) {
                return res.status(400).json({message: 'Нет такого типа петель для изменения'})
            }

            res.status(200).json({message: 'Данные типа петель изменены', hingeType})
        } catch (e) {
            res.status(400).json({message: 'Ошибка при изменении типа петель', e})
        }
    }
}

module.exports = new hingeTypeController()