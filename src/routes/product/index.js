'use strict'

const express = require('express')
const router = express.Router()
const productController = require('../../controllers/product.controller')
const {asyncHandler} = require("../../helpers/asyncHandller");
const {authenticationV2} = require("../../auth/authUtils");


// authentication
router.use(authenticationV2)

// create product
router.post('', asyncHandler(productController.createProduct))

module.exports = router