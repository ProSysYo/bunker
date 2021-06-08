const { validationResult } = require("express-validator")

const { Customer } = require("../models/customer")

class customerController {
    async addCustomer(req, res) {
        try {
            const errors = validationResult(req)
            
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка валидации", errors})
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
            const customers = await Customer.find()
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
}

module.exports = new customerController()