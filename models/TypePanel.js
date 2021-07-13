const {Schema, model} = require('mongoose')
const {check} = require('express-validator')

const typePanelValidate = [
    check('name', 'Имя не должно быть пустым').notEmpty(),    
    check('thick', 'Неизвестная толщина').isIn([0, 6, 10, 12, 16, 22]),    
    check('isMilling', 'Выберите возможность фрезеровки').isBoolean()
]

const typePanelSchema = new Schema({
    name: {type: String, unique: true, required: true},    
    thick: {type: Number, required: true, enum: [0, 6, 10, 12, 16, 22]},    
    isMilling: {type: Boolean, required: true} //Возможность фрезеровки?
})

const TypePanel = model('TypePanel', typePanelSchema)

module.exports = { TypePanel, typePanelValidate }