const { validationResult } = require("express-validator")

const { FormatError } = require("../utils/format-error")

const { Wrap } = require("../models/Wrap")

class wrapController {
    async add(req, res) {
        try {
            const errors = validationResult(req)
            
            if (!errors.isEmpty()) {
                const formatedErrors = FormatError(errors)                
                return res.status(400).json({message: "Ошибка валидации", errors: formatedErrors})
            }

            const { name, originalName } = req.body

            const findWrap = await Wrap.findOne({name})

            if (findWrap) {
                return res.status(403).json({message: 'Такая пленка уже существует'})
            }

            const newWrap = new Wrap({name, originalName})

            const wrap = await newWrap.save()

            return res.status(200).json({message: 'Новая пленка добавлена', wrap})
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Ошибка при добавлении пленки', e})
        }
    }

    async getAll(req, res) {
        try {            
            const wraps = await Wrap.find().sort({name: 1}).exec()
            return res.json(wraps)
        } catch (e) {
            res.status(400).json({message: 'Ошибка при получении пленок', e})
        }
    }

    async getById(req, res) {
        try {
            const id = req.params.id           
            const wrap = await Wrap.findById(id)

            if (!wrap) {
                return res.status(400).json({message: 'Пленка не найдена'})
            }
            return res.json(wrap)
        } catch (e) {
            res.status(400).json({message: 'Ошибка при получении пленки', e})
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id

            const wrap = await Wrap.findOneAndDelete({_id: id})

            if (!wrap) {
                return res.status(400).json({message: 'Нет такой пленки для удаления'})
            }

            res.status(200).json({message: 'Пленка удалена'})
        } catch (e) {
            res.status(400).json({message: 'Ошибка при удалении пленки', e})
        }
    }

    async update(req, res) {
        try {
            const errors = validationResult(req)
            
            if (!errors.isEmpty()) {
                const formatedErrors = FormatError(errors)                
                return res.status(400).json({message: "Ошибка валидации", errors: formatedErrors})
            }
            
            const wrap = await Wrap.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true})
            if (!wrap) {
                return res.status(400).json({message: 'Нет такой пленки для изменения'})
            }

            res.status(200).json({message: 'Данные пленки изменены', wrap})
        } catch (e) {
            res.status(400).json({message: 'Ошибка при изменении пленки', e})
        }
    }
}

module.exports = new wrapController()