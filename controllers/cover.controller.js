const { validationResult } = require("express-validator")

const { FormatError } = require("../utils/format-error")

const { Cover } = require("../models/Cover")

class coverController {
    async add(req, res) {
        try {
            const errors = validationResult(req)
            
            if (!errors.isEmpty()) {
                const formatedErrors = FormatError(errors)                
                return res.status(400).json({message: "Ошибка валидации", errors: formatedErrors})
            }

            const { name, type } = req.body

            const findCover = await Cover.findOne({name})

            if (findCover) {
                return res.status(403).json({message: 'Такая накладка уже существует'})
            }

            const newCover = new Cover({name, type})

            const cover = await newCover.save()

            return res.status(200).json({message: 'Новая накладка добавлена', cover})
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Ошибка при добавлении накладки', e})
        }
    }

    async getAll(req, res) {
        try {            
            const сovers = await Cover.find().sort({name: 1}).exec()
            return res.json(сovers)
        } catch (e) {
            res.status(400).json({message: 'Ошибка при получении накладок', e})
        }
    }

    async getById(req, res) {
        try {
            const id = req.params.id           
            const cover = await Cover.findById(id)

            if (!cover) {
                return res.status(400).json({message: 'Накладка не найдена'})
            }
            return res.json(cover)
        } catch (e) {
            res.status(400).json({message: 'Ошибка при получении накладок', e})
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id

            const cover = await Cover.findOneAndDelete({_id: id})

            if (!cover) {
                return res.status(400).json({message: 'Нет такой накладки для удаления'})
            }

            res.status(200).json({message: 'Накладка удалена'})
        } catch (e) {
            res.status(400).json({message: 'Ошибка при удалении накладки', e})
        }
    }

    async update(req, res) {
        try {
            const errors = validationResult(req)
            
            if (!errors.isEmpty()) {
                const formatedErrors = FormatError(errors)                
                return res.status(400).json({message: "Ошибка валидации", errors: formatedErrors})
            }
            
            const cover = await Cover.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true})
            if (!cover) {
                return res.status(400).json({message: 'Нет такой накладки для изменения'})
            }

            res.status(200).json({message: 'Данные накладки изменены', cover})
        } catch (e) {
            res.status(400).json({message: 'Ошибка при изменении накладки', e})
        }
    }
}

module.exports = new coverController()