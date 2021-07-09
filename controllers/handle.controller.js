const { validationResult } = require("express-validator")

const { FormatError } = require("../utils/format-error")

const { Handle } = require("../models/Handle")

class handleController {
    async add(req, res) {
        try {
            const errors = validationResult(req)
            
            if (!errors.isEmpty()) {
                const formatedErrors = FormatError(errors)                
                return res.status(400).json({message: "Ошибка валидации", errors: formatedErrors})
            }

            const { name, originalName } = req.body

            const findHandle = await Handle.findOne({name})

            if (findHandle) {
                return res.status(403).json({message: 'Такая ручка уже существует'})
            }

            const newHandle = new Handle({name, originalName})

            const handle = await newHandle.save()

            return res.status(200).json({message: 'Новая ручка добавлена', handle})
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Ошибка при добавлении ручки', e})
        }
    }

    async getAll(req, res) {
        try {            
            const сovers = await Handle.find().sort({name: 1}).exec()
            return res.json(сovers)
        } catch (e) {
            res.status(400).json({message: 'Ошибка при получении ручек', e})
        }
    }

    async getById(req, res) {
        try {
            const id = req.params.id           
            const handle = await Handle.findById(id)

            if (!handle) {
                return res.status(400).json({message: 'Ручка не найдена'})
            }
            return res.json(handle)
        } catch (e) {
            res.status(400).json({message: 'Ошибка при получении ручек', e})
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id

            const handle = await Handle.findOneAndDelete({_id: id})

            if (!handle) {
                return res.status(400).json({message: 'Нет такой ручки для удаления'})
            }

            res.status(200).json({message: 'Ручка удалена'})
        } catch (e) {
            res.status(400).json({message: 'Ошибка при удалении ручки', e})
        }
    }

    async update(req, res) {
        try {
            const errors = validationResult(req)
            
            if (!errors.isEmpty()) {
                const formatedErrors = FormatError(errors)                
                return res.status(400).json({message: "Ошибка валидации", errors: formatedErrors})
            }
            
            const handle = await Handle.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true})
            if (!handle) {
                return res.status(400).json({message: 'Нет такой ручки для изменения'})
            }

            res.status(200).json({message: 'Данные ручки изменены', handle})
        } catch (e) {
            res.status(400).json({message: 'Ошибка при изменении ручки', e})
        }
    }
}

module.exports = new handleController()