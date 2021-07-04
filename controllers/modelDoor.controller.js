const { validationResult } = require("express-validator")

const { ModelDoor } = require("../models/ModelDoor")

const FormatError = (errors) => {
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
    const result = extractedErrors.reduce((acc, item) => {
        Object.keys(item).forEach(key => {
            if (acc.hasOwnProperty(key)) {
                acc[key] += ', ' + item[key];
            } else {
                acc[key] = item[key];
            }
        });
        return acc;
    }, {});

    return result
}

class modelDoorController {
    async addModel(req, res) {
        try {
            const errors = validationResult(req)            
            if (!errors.isEmpty()) {
                const formatedErrors = FormatError(errors)                
                return res.status(400).json({message: "Ошибка валидации", errors: formatedErrors})
            }
            
            const {
                abbreviation, trimOutside, trimInside, isDoubleDoors, insulation, countContour
            } = req.body

            const model = await ModelDoor.findOne({abbreviation})

            if (model) {
                return res.status(403).json({message: 'Такая модель двери уже существует'})
            }

            const newModelDoor = new ModelDoor({
                abbreviation, trimOutside, trimInside, isDoubleDoors, insulation, countContour
            })

            const modelDoor = await newModelDoor.save()

            return res.status(200).json({message: 'Новая модель добавлена', modelDoor})
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Ошибка при добавлении модели', e})
        }
    }

    async getModels(req, res) {
        try {            
            const models = await ModelDoor.find().sort({abbreviation: 1}).exec()       
            return res.status(200).json(models)
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Ошибка при получении моделей', e})
        }
    }

    async getById(req, res) {
        try {           
            const id = req.params.id

            const model = await ModelDoor.findById(id)

            if (!model) {
                return res.status(400).json({message: 'Модель не найдена'})
            }

            return res.json(model)
        } catch (e) {
            res.status(400).json({message: 'Ошибка при получении модели', e})
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id

            const model = await ModelDoor.findOneAndDelete({_id: id})

            if (!model) {
                return res.status(400).json({message: 'Нет такой модели для удаления'})
            }

            res.status(200).json({message: 'Удалено'})
        } catch (e) {
            res.status(400).json({message: 'Ошибка при удалении модели', e})
        }
    }

    async update(req, res) {
        try {
            const errors = validationResult(req)
            
            if (!errors.isEmpty()) {
                const formatedErrors = FormatError(errors)                
                return res.status(400).json({message: "Ошибка валидации", errors: formatedErrors})
            }

            const model = await ModelDoor.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true})
            if (!model) {
                return res.status(400).json({message: 'Нет такой модели для обновления'})
            }

            res.status(200).json({message: 'Обновлено', model})
        } catch (e) {
            res.status(400).json({message: 'Ошибка при обновлении модели', e})
        }
    }
}

module.exports = new modelDoorController()