const { validationResult } = require("express-validator")

const { FormatError } = require("../utils/format-error")

const { Packaging } = require("../models/Packaging")

class packagingController {
    async add(req, res) {
        try {
            const errors = validationResult(req)
            
            if (!errors.isEmpty()) {
                const formatedErrors = FormatError(errors)                
                return res.status(400).json({message: "Ошибка валидации", errors: formatedErrors})
            }

            const { name, owner } = req.body

            const findPackaging = await Packaging.findOne({name})

            if (findPackaging) {
                return res.status(403).json({message: 'Такая упаковка уже существует'})
            }

            const newPackaging = new Packaging({name, owner})

            const packaging = await newPackaging.save()

            return res.status(200).json({message: 'Новая упаковка добавлена', packaging})
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Ошибка при добавлении упаковки', e})
        }
    }

    async getAll(req, res) {
        try {            
            const packagings = await Packaging.find().sort({name: 1}).exec()
            return res.json(packagings)
        } catch (e) {
            res.status(400).json({message: 'Ошибка при получении упаковок', e})
        }
    }

    async getById(req, res) {
        try {
            const id = req.params.id           
            const packaging = await Packaging.findById(id)

            if (!packaging) {
                return res.status(400).json({message: 'Упаковка не найдена'})
            }
            return res.json(packaging)
        } catch (e) {
            res.status(400).json({message: 'Ошибка при получении упаковки', e})
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id

            const packaging = await Packaging.findOneAndDelete({_id: id})

            if (!packaging) {
                return res.status(400).json({message: 'Нет такой упаковки для удаления'})
            }

            res.status(200).json({message: 'Упаковка удалена'})
        } catch (e) {
            res.status(400).json({message: 'Ошибка при удалении упаковки', e})
        }
    }

    async update(req, res) {
        try {
            const errors = validationResult(req)
            
            if (!errors.isEmpty()) {
                const formatedErrors = FormatError(errors)                
                return res.status(400).json({message: "Ошибка валидации", errors: formatedErrors})
            }
            
            const packaging = await Packaging.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true})
            if (!packaging) {
                return res.status(400).json({message: 'Нет такой упаковки для изменения'})
            }

            res.status(200).json({message: 'Данные упаковки изменены', packaging})
        } catch (e) {
            res.status(400).json({message: 'Ошибка при изменении упаковки', e})
        }
    }
}

module.exports = new packagingController()