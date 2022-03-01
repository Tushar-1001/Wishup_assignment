const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')
const subController = require('../controllers/subscriptionController')

router.put('/user/:userName' , userController.userCreation)
router.get('/user/:userName' , userController.fetchUser)

router.post('/subscription' , subController.createSubscription)
// router.get('/subscription/:userName/:date' , subController.fetchingSubscriptionDetailsWithDate)
router.get('/subscription/:userName' , subController.fetchingSubscriptionDetailsWithoutDate)


module.exports = router