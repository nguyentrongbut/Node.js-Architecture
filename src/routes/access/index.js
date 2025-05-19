'use strict'

const express = require('express')
const router = express.Router()
const accessController = require('../../controllers/access.controller')
const {asyncHandler} = require("../../helpers/asyncHandller");
const {authentication} = require("../../auth/authUtils");


// signUp
router.post('/shop/signup', asyncHandler(accessController.signUp))
// login
router.post('/shop/login', asyncHandler(accessController.login))

// authentication
router.use(authentication)

// logout
router.post('/shop/logout', asyncHandler(accessController.logout))


// End authentication
module.exports = router