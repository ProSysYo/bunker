const Router = require('express')
const {check} = require('express-validator')

const controller = require('../controllers/auth.controller')


const router = new Router()

router.post('/registration', [
    check('username', 'Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Пароль должен быть больше 4 и меньше 10 символов').isLength({min: 4, max: 10})    
], controller.registration)

router.post('/login', [
    check('username', 'Имя пользователя не должно быть пустым').notEmpty(),
    check('password', 'Пароль должен бытьбольше 4 и меньше 10 символов').isLength({min: 4, max: 10})
], controller.login)

router.get('/users', controller.getUsers)

module.exports = router