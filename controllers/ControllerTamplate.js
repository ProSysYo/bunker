const { validationResult } = require("express-validator")

const { FormatError } = require("../utils/format-error")

//const { FurnitureColor } = require("../models/FurnitureColor")

class ??? {
    async add(req, res) {
        try {
            const errors = validationResult(req)
            
            if (!errors.isEmpty()) {
                const formatedErrors = FormatError(errors)                
                return res.status(400).json({message: "Ошибка валидации", errors: formatedErrors})
            }

            const { ???, ??? } = req.body

            const ??? = await ???.findOne({???})

            if (???) {
                return res.status(403).json({message: 'Такой ??? уже существует'})
            }

            const ??? = new ???({???, ???})

            const ??? = await ???.save()

            return res.status(200).json({message: 'Новый ??? добавлен', ???})
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Ошибка при добавлении ???', e})
        }
    }

    async getAll(req, res) {
        try {            
            const ??? = await ???.find().sort({???: 1}).exec()
            return res.json(furnitureColors)
        } catch (e) {
            res.status(400).json({message: 'Ошибка при получении ???', e})
        }
    }

    async getById(req, res) {
        try {
            const id = req.params.id           
            const ??? = await ???.findById(id)

            if (!???) {
                return res.status(400).json({message: '??? не найден'})
            }
            return res.json(???)
        } catch (e) {
            res.status(400).json({message: 'Ошибка при получении ???', e})
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id

            const ??? = await ???.findOneAndDelete({_id: id})

            if (!???) {
                return res.status(400).json({message: 'Нет такого ??? для удаления'})
            }

            res.status(200).json({message: '??? удален'})
        } catch (e) {
            res.status(400).json({message: 'Ошибка при удалении ???', e})
        }
    }

    async update(req, res) {
        try {
            const errors = validationResult(req)
            
            if (!errors.isEmpty()) {
                const formatedErrors = FormatError(errors)                
                return res.status(400).json({message: "Ошибка валидации", errors: formatedErrors})
            }
            
            const ??? = await ???.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true})
            if (!???) {
                return res.status(400).json({message: 'Нет такого ??? для изменения'})
            }

            res.status(200).json({message: 'Данные ??? изменены', ???})
        } catch (e) {
            res.status(400).json({message: 'Ошибка при изменении ???', e})
        }
    }
}

module.exports = new ???()