'use strict'

const AccessService = require('../services/access.service')
const {CREATED, SuccessResponse} = require("../core/success.response");

class AccessController {

    handlerRefreshToken = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get token Success!',
            metadata: await AccessService.handleRefreshToken(req.body.refreshToken )
        }).send(res)
    }

    logout = async (req, res, next) => {
        new SuccessResponse({
            message: 'Logout Success!',
            metadata: await AccessService.logout(req.keyStore)
        }).send(res)
    }

    login = async (req, res, next) => {
        new SuccessResponse({
            message: 'Login Success!',
            metadata: await AccessService.login(req.body)
        }).send(res)
    }

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