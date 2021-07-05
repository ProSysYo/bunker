const Router = require('express')

const padColorController = require('../controllers/pad-color.controller')
const { padColorValidate } = require('../models/PadColor')

const router = new Router()

router.post('/', padColorValidate, padColorController.add)

router.get('/', padColorController.getAll)

router.get('/:id', padColorController.getById)

router.delete('/:id', padColorController.delete)

router.patch('/:id', padColorValidate, padColorController.update)

module.exports = router