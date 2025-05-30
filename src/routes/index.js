'use strict'

const express = require('express')
const {apiKey, permission} = require("../auth/checkAuth");
const router = express.Router()

// check apiKey
router.use(apiKey)

// check permission
router.use(permission('0000'))

router.use('/v1/api', require('./access'))
// router.get('', (req, res, next) => {
//     return res.status(200).json({
//         message: 'Hello World!',
//     })
// })
router.use('/v1/api/product', require('./product'))

module.exports = router