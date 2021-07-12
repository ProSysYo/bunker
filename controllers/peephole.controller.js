const { validationResult } = require("express-validator")

const { FormatError } = require("../utils/format-error")

const { Peephole } = require("../models/Peephole")

class peepholeController {
    async add(req, res) {
        try {
            const errors = validationResult(req)
            
            if (!errors.isEmpty()) {
                const formatedErrors = FormatError(errors)                
                return res.status(400).json({message: "Ошибка валидации", errors: formatedErrors})
            }

            const { name, originalName } = req.body

            const findPeephole = await Peephole.findOne({name})

            if (findPeephole) {
                return res.status(403).json({message: 'Такой глазок уже существует'})
            }

            const newPeephole = new Peephole({name, originalName})

            const peephole = await newPeephole.save()

            return res.status(200).json({message: 'Новый глазок добавлен', peephole})
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Ошибка при добавлении глазка', e})
        }
    }

    async getAll(req, res) {
        try {            
            const сovers = await Peephole.find().sort({name: 1}).exec()
            return res.json(сovers)
        } catch (e) {
            res.status(400).json({message: 'Ошибка при получении глазков', e})
        }
    }

    async getById(req, res) {
        try {
            const id = req.params.id           
            const peephole = await Peephole.findById(id)

            if (!peephole) {
                return res.status(400).json({message: 'Глазок не найден'})
            }
            return res.json(peephole)
        } catch (e) {
            res.status(400).json({message: 'Ошибка при получении глазка', e})
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id

            const peephole = await Peephole.findOneAndDelete({_id: id})

            if (!peephole) {
                return res.status(400).json({message: 'Нет такого злазка для удаления'})
            }

            res.status(200).json({message: 'Глазок удален'})
        } catch (e) {
            res.status(400).json({message: 'Ошибка при удалении глазка', e})
        }
    }

    async update(req, res) {
        try {
            const errors = validationResult(req)
            
            if (!errors.isEmpty()) {
                const formatedErrors = FormatError(errors)                
                return res.status(400).json({message: "Ошибка валидации", errors: formatedErrors})
            }
            
            const peephole = await Peephole.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true})
            if (!peephole) {
                return res.status(400).json({message: 'Нет такого глазка для изменения'})
            }

            res.status(200).json({message: 'Данные глазка изменены', peephole})
        } catch (e) {
            res.status(400).json({message: 'Ошибка при изменении глазка', e})
        }
    }
}

module.exports = new peepholeController()