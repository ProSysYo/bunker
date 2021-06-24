const { validationResult } = require("express-validator")

const { Customer } = require("../models/Customer")

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


class customerController {
    async addCustomer(req, res) {
        try {
            const errors = validationResult(req)
            
            if (!errors.isEmpty()) {
                const formatedErrors = FormatError(errors)                
                return res.status(400).json({message: "Ошибка валидации", errors: formatedErrors})
            }

            const { code, name, phone, email, adress } = req.body

            const candidate = await Customer.findOne({code})

            if (candidate) {
                return res.status(403).json({message: 'Заказчик с таким кодом уже существует'})
            }

            const newCustomer = new Customer({code, name, phone, email, adress})

            const customer = await newCustomer.save()

            return res.status(200).json({message: 'Новый заказчик создан', customer})
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Ошибка при добавлении заказчика', e})
        }
    }

    async getCustomers(req, res) {
        try {            
            const customers = await Customer.find().sort({code: 1}).exec()
            return res.json(customers)
        } catch (e) {
            res.status(400).json({message: 'Error in get customers', e})
        }
    }

    async getById(req, res) {
        try {
            const id = req.params.id           
            const customer = await Customer.findById(id)

            if (!customer) {
                return res.status(400).json({message: 'Заказчик не найден'})
            }
            return res.json(customer)
        } catch (e) {
            res.status(400).json({message: 'Error in get customer by id', e})
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id

            const customer = await Customer.findOneAndDelete({_id: id})

            if (!customer) {
                return res.status(400).json({message: 'Нет такого заказчика для удаления'})
            }

            res.status(200).json({message: 'Удалено'})
        } catch (e) {
            res.status(400).json({message: 'Ошибка при удалении заказчика', e})
        }
    }

    async update(req, res) {
        try {
            const errors = validationResult(req)
            
            if (!errors.isEmpty()) {
                const formatedErrors = FormatError(errors)                
                return res.status(400).json({message: "Ошибка валидации", errors: formatedErrors})
            }
            
            const customer = await Customer.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true})
            if (!customer) {
                return res.status(400).json({message: 'Нет такого заказчика для обновления'})
            }

            res.status(200).json({message: 'Обновлено', customer})
        } catch (e) {
            res.status(400).json({message: 'Ошибка при обновлении заказчика', e})
        }
    }
}

module.exports = new customerController()