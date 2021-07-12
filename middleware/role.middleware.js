const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function(roles) {
    return function(req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }

        try {
            //Ищем в headers токен
            const token = req.headers.authorization.split(' ')[1]

            //Если пользователь не авторизован возвращаем ошибку
            if (!token) {
                return res.status(403).json({message: "Пользователь не авторизован"})
            }

            //Верифицируем пользователя и вытягиваем массив ролей
            const {roles: userRoles} = jwt.verify(token, config.get('secret'))

            let hasRole = false

            //Если в массиве ролей пользователя существует один из ролей, передаваемых в middleware, то даем доступ
            userRoles.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true
                }
            }) 
            //Если такой роли у пользователя нет, возвращаем ошибку
            if (!hasRole) {
                return res.status(403).json({message: 'У вас нет доступа'})
            }
            
            next()
        } catch (e) {
            console.log(e)
            return res.status(403).json({message: "Пользователь не авторизован"})
        }
    }
}