const { validationResult } = require("express-validator")

const { FormatError } = require("../utils/format-error")

const { PeepholeLocation } = require("../models/PeepholeLocation")

class peepholeLocationController {
    async add(req, res) {
        try {
            const errors = validationResult(req)
            
            if (!errors.isEmpty()) {
                const formatedErrors = FormatError(errors)                
                return res.status(400).json({message: "Ошибка валидации", errors: formatedErrors})
            }

            const { name } = req.body

            const findPeepholeLocation = await PeepholeLocation.findOne({name})

            if (findPeepholeLocation) { 
                return res.status(403).json({message: 'Такое расположение глазка уже существует'})
            }

            const newPeepholeLocation = new PeepholeLocation({name})

            const peepholeLocation = await newPeepholeLocation.save()

            return res.status(200).json({message: 'Новое расположение глазка добавлено', peepholeLocation})
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Ошибка при добавлении распложения глазка', e})
        }
    }

    async getAll(req, res) {
        try {            
            const peepholeLocations = await PeepholeLocation.find().sort({name: 1}).exec()
            return res.json(peepholeLocations)
        } catch (e) {
            res.status(400).json({message: 'Ошибка при получении расположений глазков', e})
        }
    }

    async getById(req, res) {
        try {
            const id = req.params.id           
            const peepholeLocation = await PeepholeLocation.findById(id)

            if (!peepholeLocation) {
                return res.status(400).json({message: 'Такое расположение глазка не найдено'})
            }
            return res.json(peepholeLocation)
        } catch (e) {
            res.status(400).json({message: 'Ошибка при получении глазка', e})
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id

            const peepholeLocation = await PeepholeLocation.findOneAndDelete({_id: id})

            if (!peepholeLocation) {
                return res.status(400).json({message: 'Нет такого расположения глазка для удаления'})
            }

            res.status(200).json({message: 'Расположение глазка удалено'})
        } catch (e) {
            res.status(400).json({message: 'Ошибка при удалении расположения глазка', e})
        }
    }

    async update(req, res) {
        try {
            const errors = validationResult(req)
            
            if (!errors.isEmpty()) {
                const formatedErrors = FormatError(errors)                
                return res.status(400).json({message: "Ошибка валидации", errors: formatedErrors})
            }
            
            const peepholeLocation = await PeepholeLocation.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true})
            if (!peepholeLocation) {
                return res.status(400).json({message: 'Нет такого расположения глазка для изменения'})
            }

            res.status(200).json({message: 'Данные расположения глазка изменены', peepholeLocation})
        } catch (e) {
            res.status(400).json({message: 'Ошибка при изменении расположения глазка', e})
        }
    }
}

module.exports = new peepholeLocationController()