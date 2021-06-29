const { validationResult } = require("express-validator")

const { FormatError } = require("../utils/format-error")

const { Lock } = require("../models/Lock")

class lockController {
    async add(req, res) {
        try {
            const errors = validationResult(req)
            
            if (!errors.isEmpty()) {
                const formatedErrors = FormatError(errors)                
                return res.status(400).json({message: "Ошибка валидации", errors: formatedErrors})
            }

            const { name, type, isLatch } = req.body

            const findLock = await Lock.findOne({name})

            if (findLock) {
                return res.status(403).json({message: 'Замок с таким именем уже существует'})
            }

            const newLock = new Lock({name, type, isLatch})

            const lock = await newLock.save()

            return res.status(200).json({message: 'Новый замок добавлен', lock})
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Ошибка при добавлении замка', e})
        }
    }

    async getAll(req, res) {
        try {            
            const locks = await Lock.find().sort({name: 1}).exec()
            return res.json(customers)
        } catch (e) {
            res.status(400).json({message: 'Ошибка при получении замков', e})
        }
    }

    async getById(req, res) {
        try {
            const id = req.params.id           
            const lock = await Lock.findById(id)

            if (!lock) {
                return res.status(400).json({message: 'Замок не найден'})
            }
            return res.json(lock)
        } catch (e) {
            res.status(400).json({message: 'Ошибка при получении закачика', e})
        }
    }

    async delete(req, res) {
        try {
            
        } catch (e) {
           
        }
    }

    async update(req, res) {
        try {
            
        } catch (e) {
            
        }
    }
}

module.exports = new lockController()