const { validationResult } = require("express-validator")

const { FormatError } = require("../utils/format-error")

const { HingeSide } = require("../models/HingeSide")

class hingeSideController {
    async add(req, res) {
        try {
            const errors = validationResult(req)
            
            if (!errors.isEmpty()) {
                const formatedErrors = FormatError(errors)                
                return res.status(400).json({message: "Ошибка валидации", errors: formatedErrors})
            }

            const { name } = req.body

            const findHingeSide = await HingeSide.findOne({name})

            if (findHingeSide) { 
                return res.status(403).json({message: 'Такая сторонность петель уже существует'})
            }

            const newHingeSide = new HingeSide({name})

            const hingeSide = await newHingeSide.save()

            return res.status(200).json({message: 'Новая сторонность петель добавлена', hingeSide})
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Ошибка при добавлении сторонности петель', e})
        }
    }

    async getAll(req, res) {
        try {            
            const hingeSides = await HingeSide.find().sort({name: 1}).exec()
            return res.json(hingeSides)
        } catch (e) {
            res.status(400).json({message: 'Ошибка при получении сторонностей петель', e})
        }
    }

    async getById(req, res) {
        try {
            const id = req.params.id           
            const hingeSide = await HingeSide.findById(id)

            if (!hingeSide) {
                return res.status(400).json({message: 'Такая сторонность петель не найдена'})
            }
            return res.json(hingeSide)
        } catch (e) {
            res.status(400).json({message: 'Ошибка при получении сторонности петель', e})
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id

            const hingeSide = await HingeSide.findOneAndDelete({_id: id})

            if (!hingeSide) {
                return res.status(400).json({message: 'Нет такой сторонности петель для удаления'})
            }

            res.status(200).json({message: 'Сторонность петель удалена'})
        } catch (e) {
            res.status(400).json({message: 'Ошибка при удалении сторонности петель', e})
        }
    }

    async update(req, res) {
        try {
            const errors = validationResult(req)
            
            if (!errors.isEmpty()) {
                const formatedErrors = FormatError(errors)                
                return res.status(400).json({message: "Ошибка валидации", errors: formatedErrors})
            }
            
            const hingeSide = await HingeSide.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true})
            if (!hingeSide) {
                return res.status(400).json({message: 'Нет такой сторонности петель для изменения'})
            }

            res.status(200).json({message: 'Данные сторонности петель изменены', hingeSide})
        } catch (e) {
            res.status(400).json({message: 'Ошибка при изменении сторонности петель', e})
        }
    }
}

module.exports = new hingeSideController()