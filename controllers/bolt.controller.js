const { validationResult } = require("express-validator")

const { FormatError } = require("../utils/format-error")

const { Bolt } = require("../models/Bolt")

class boltController {
    async add(req, res) {
        try {
            const errors = validationResult(req)
            
            if (!errors.isEmpty()) {
                const formatedErrors = FormatError(errors)                
                return res.status(400).json({message: "Ошибка валидации", errors: formatedErrors})
            }

            const { name, type } = req.body

            const findBolt = await Bolt.findOne({name})

            if (findBolt) {
                return res.status(403).json({message: 'Такой засов уже существует'})
            }

            const newBolt = new Bolt({name, type})

            const bolt = await newBolt.save()

            return res.status(200).json({message: 'Новый засов добавлен', bolt})
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Ошибка при добавлении засова', e})
        }
    }

    async getAll(req, res) {
        try {            
            const bolts = await Bolt.find().sort({name: 1}).exec()
            return res.json(bolts)
        } catch (e) {
            res.status(400).json({message: 'Ошибка при получении засовов', e})
        }
    }

    async getById(req, res) {
        try {
            const id = req.params.id           
            const bolt = await Bolt.findById(id)

            if (!bolt) {
                return res.status(400).json({message: 'Засов не найден'})
            }
            return res.json(bolt)
        } catch (e) {
            res.status(400).json({message: 'Ошибка при получении засова', e})
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id

            const bolt = await Bolt.findOneAndDelete({_id: id})

            if (!bolt) {
                return res.status(400).json({message: 'Нет такого засова для удаления'})
            }

            res.status(200).json({message: 'Засов удален'})
        } catch (e) {
            res.status(400).json({message: 'Ошибка при удалении засова', e})
        }
    }

    async update(req, res) {
        try {
            const errors = validationResult(req)
            
            if (!errors.isEmpty()) {
                const formatedErrors = FormatError(errors)                
                return res.status(400).json({message: "Ошибка валидации", errors: formatedErrors})
            }
            
            const bolt = await Bolt.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true})
            if (!bolt) {
                return res.status(400).json({message: 'Нет такого засова для изменения'})
            }

            res.status(200).json({message: 'Данные засова изменены', bolt})
        } catch (e) {
            res.status(400).json({message: 'Ошибка при изменении засова', e})
        }
    }
}

module.exports = new boltController()