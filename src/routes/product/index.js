'use strict'

const express = require('express')
const router = express.Router()
const productController = require('../../controllers/product.controller')
const {asyncHandler} = require("../../helpers/asyncHandller");
const {authentication} = require("../../auth/authUtils");


// authentication
router.use(authentication)

// create product
router.post('', asyncHandler(productController.createProduct))

module.exports = router