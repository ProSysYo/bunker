const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')

const User = require('../models/user')
const Role = require('../models/role')

class authController {
    //эндпоинт регистрации: входные параметры: username, password
    async registration(req, res) {
        try {            
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации", errors})
            }
            //Деструктурирем username и password с объекта request
            //Если username и password нет в request можно вывести ошибку, что поля пустые, но в валидации мы указали
            //что эти поля не могут быть пустыми, поэтому нет в этом надобности, валидатор выведет ошибку
            const {username, password} = req.body
            
            //Проверяем существует ли такой пользователь в базе, если такой кандидат уже есть, то
            //выведем ошибку
            const candidate = await User.findOne({username})

            if (candidate) {
                return res.status(409).json({message: "Пользователь с таким именем уже существует"})
            }
            //Генерируем salt и хэш пароля
            const salt = bcrypt.genSaltSync(10)
            const hashPassword = bcrypt.hashSync(password, salt)

            //Получаем роль USER
            const userRole = await Role.findOne({value:'USER'})

            //Создаем нового пользователя, добавляем по умолчанию роль USER
            const user = new User({username, password: hashPassword, roles:[userRole.value]})
            
            //Сохраняем пользователя в базе
            await user.save()

            return res.json({message: "Пользователь успешно зарегистрирован"})
        } catch (e) {
            res.status(400).json({message: 'Registration error', e})
        }
    }

    async login(req, res) {
        return res.status(200).json({message: 'login'})
    }
}

module.exports = new authController()