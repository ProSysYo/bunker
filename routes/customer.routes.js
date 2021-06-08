const Router = require('express')

const customerController = require('../controllers/customer.controller')
const { customerValidate } = require('../models/customer')

const router = new Router()

router.post('/', customerValidate, customerController.addCustomer)

router.get('/', customerController.getCustomers)

router.get('/:id', customerController.getById)

module.exports = router