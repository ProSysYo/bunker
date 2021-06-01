const User = require('../models/user')
const Role = require('../models/role')

class authController {
    async registration(req, res) {
        try {
            const {username, password} = req.body

            const userRole = await Role.findOne({value:'USER'})

            const user = new User({username, password, roles:[userRole.value]})
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