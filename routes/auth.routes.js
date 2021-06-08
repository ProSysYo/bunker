const Router = require('express')
const roleMiddleware = require('../middleware/role.middleware')

const controller = require('../controllers/auth.controller')
const { userValidate } = require('../models/user')

const router = new Router()

router.post('/registration', userValidate, controller.registration)

router.post('/login', userValidate, controller.login)

//Доступен только для администратора
router.get('/users', roleMiddleware(["ADMIN"]) , controller.getUsers)

module.exports = router