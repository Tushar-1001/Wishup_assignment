const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')

router.put('/user/:userName' , userController.userCreation)
router.get('/user/:userName' , userController.fetchUser)


module.exports = router