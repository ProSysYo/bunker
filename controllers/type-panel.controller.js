const { validationResult } = require("express-validator")

const { FormatError } = require("../utils/format-error")

const { TypePanel } = require("../models/TypePanel")

class typePanelController {
    async add(req, res) {
        try {
            const errors = validationResult(req)
            
            if (!errors.isEmpty()) {
                const formatedErrors = FormatError(errors)                
                return res.status(400).json({message: "Ошибка валидации", errors: formatedErrors})
            }

            const { name, thick, isMilling } = req.body

            const findTypePanel = await TypePanel.findOne({name})

            if (findTypePanel) { 
                return res.status(403).json({message: 'Такой тип уже существует'})
            }

            const newTypePanel = new TypePanel({ name, thick, isMilling })

            const typePanel = await newTypePanel.save()

            return res.status(200).json({message: 'Новый тип добавлен', typePanel})
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Ошибка при добавлении типа', e})
        }
    }

    async getAll(req, res) {
        try {            
            const typePanels = await TypePanel.find().sort({name: 1}).exec()
            return res.json(typePanels)
        } catch (e) {
            res.status(400).json({message: 'Ошибка при получении типов', e})
        }
    }

    async getById(req, res) {
        try {
            const id = req.params.id           
            const typePanel = await TypePanel.findById(id)

            if (!typePanel) {
                return res.status(400).json({message: 'Такой тип не найден'})
            }
            return res.json(typePanel)
        } catch (e) {
            res.status(400).json({message: 'Ошибка при получении типа', e})
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id

            const typePanel = await TypePanel.findOneAndDelete({_id: id})

            if (!typePanel) {
                return res.status(400).json({message: 'Нет такого типа для удаления'})
            }

            res.status(200).json({message: 'Тип удален'})
        } catch (e) {
            res.status(400).json({message: 'Ошибка при удалении типаи', e})
        }
    }

    async update(req, res) {
        try {
            const errors = validationResult(req)
            
            if (!errors.isEmpty()) {
                const formatedErrors = FormatError(errors)                
                return res.status(400).json({message: "Ошибка валидации", errors: formatedErrors})
            }
            
            const typePanel = await TypePanel.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true})
            if (!typePanel) {
                return res.status(400).json({message: 'Нет такого типа для изменения'})
            }

            res.status(200).json({message: 'Данные типа изменены', typePanel})
        } catch (e) {
            res.status(400).json({message: 'Ошибка при изменении типа', e})
        }
    }
}

module.exports = new typePanelController()