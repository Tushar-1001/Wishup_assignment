const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')

router.put('/user/:userName' , userController.userCreation)


module.exports = router