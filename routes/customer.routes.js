const Router = require('express')

const customerController = require('../controllers/customer.controller')
const { customerValidate } = require('../models/customer')

const router = new Router()

router.post('/customer', customerValidate, customerController.addCustomer)

router.get('/customer', customerController.getCustomers)

module.exports = router