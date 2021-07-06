const Router = require('express')

const furnitureColorController = require('../controllers/furniture-color.controller')
const { furnitureColorValidate } = require('../models/FurnitureColor')

const router = new Router()

router.post('/', furnitureColorValidate, furnitureColorController.add)

router.get('/', furnitureColorController.getAll)

router.get('/:id', furnitureColorController.getById)

router.delete('/:id', furnitureColorController.delete)

router.patch('/:id', furnitureColorValidate, furnitureColorController.update)

module.exports = router