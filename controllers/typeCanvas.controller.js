const { validationResult } = require("express-validator")

const { FormatError } = require("../utils/format-error")

const { TypeCanvas } = require("../models/TypeCanvas")

class typeCanvasController {
    async add(req, res) {
        try {
            const errors = validationResult(req)
            
            if (!errors.isEmpty()) {
                const formatedErrors = FormatError(errors)                
                return res.status(400).json({message: "Ошибка валидации", errors: formatedErrors})
            }

            const { value, description, trimOutside, trimInside, insulation } = req.body

            const findTypeCanvas = await TypeCanvas.findOne({value})

            if (findTypeCanvas) {
                return res.status(403).json({message: 'Тип полотна с таким именем уже существует'})
            }

            const newTypeCanvas = new TypeCanvas({value, description, trimOutside, trimInside, insulation})

            const typeCanvas = await newTypeCanvas.save()

            return res.status(200).json({message: 'Новый тип полотна добавлен', typeCanvas})
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Ошибка при добавлении типа полотна', e})
        }
    }

    async getAll(req, res) {
        try {            
            const typeCanvases = await TypeCanvas.find().sort({value: 1}).exec()
            return res.json(typeCanvases)
        } catch (e) {
            res.status(400).json({message: 'Ошибка при получении типов полотен', e})
        }
    }

    async getById(req, res) {
        try {
            const id = req.params.id           
            const typeCanvas = await TypeCanvas.findById(id)

            if (!typeCanvas) {
                return res.status(400).json({message: 'Тип полотна не найден'})
            }
            return res.json(typeCanvas)
        } catch (e) {
            res.status(400).json({message: 'Ошибка при получении типа полотна', e})
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id

            const typeCanvas = await TypeCanvas.findOneAndDelete({_id: id})

            if (!typeCanvas) {
                return res.status(400).json({message: 'Нет такого типа полотна для удаления'})
            }

            res.status(200).json({message: 'Тип полотна удален'})
        } catch (e) {
            res.status(400).json({message: 'Ошибка при удалении типа полотна', e})
        }
    }

    async update(req, res) {
        try {
            const errors = validationResult(req)
            
            if (!errors.isEmpty()) {
                const formatedErrors = FormatError(errors)                
                return res.status(400).json({message: "Ошибка валидации", errors: formatedErrors})
            }
            
            const typeCanvas = await TypeCanvas.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true})
            if (!typeCanvas) {
                return res.status(400).json({message: 'Нет такого типа полотна для изменения'})
            }

            res.status(200).json({message: 'Данные типа полотна изменены', typeCanvas})
        } catch (e) {
            res.status(400).json({message: 'Ошибка при изменении типа полотна', e})
        }
    }
}

module.exports = new typeCanvasController()