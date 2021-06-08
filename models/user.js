const {Schema, model} = require('mongoose')
const {check} = require('express-validator')

const userValidate = [
    check('username', 'Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Пароль должен быть больше 4 и меньше 10 символов').isLength({min: 4, max: 10})    
]

const UserSchema = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    roles: [{type: String, ref: 'Role'}]
})

const User = model('User', UserSchema)

module.exports = { User, userValidate }
