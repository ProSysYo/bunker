const { check } = require('express-validator')
const {Schema, model} = require('mongoose')

const customerValidate = [
    check('code', 'Код дилера не может быть пустым').notEmpty(),
    check('name', 'Имя дилера не может быть пустым').notEmpty(),
    check('phone', 'Телефон дилера не может быть пустым').notEmpty(),
    check('phone', 'Не верный формат телефона').isMobilePhone(),
    check('email', 'Email не может быть пустым').notEmpty(),
    check('email', 'Email не корректен').isEmail(),
    check('adress', 'Адрес не может быть пустым').notEmpty()    
]

const customerSchema = new Schema({
    code: {type: String, unique: true, required: true},
    name: {type: String, unique: true, required: true},
    phone: {type: String,unique: true, required: true},
    email: {type: String, unique: true, required: true},
    adress: {type: String, required: true}
})

const Customer = model('Customer', customerSchema)

module.exports = { Customer, customerValidate }