'use strict'

const AccessService = require('../services/access.service')
const {CREATED} = require("../core/success.response");

class AccessController {

    signUp = async (req, res, next) => {

        const result = await AccessService.signUp(req.body)
        new CREATED({
            message: 'Registered OK!',
            metadata: result,
            options: {
                limit: 10
            }
        }).send(res)
    }
}

module.exports = new AccessController()