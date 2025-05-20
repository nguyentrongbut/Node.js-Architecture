'use strict'

const JWT = require('jsonwebtoken')
const {asyncHandler} = require("../helpers/asyncHandller");
const {AuthFailError, NotFoundError} = require("../core/error.response");

// services
const { findByUserId } = require("../services/keyToken.service");

const HEADER = {
    API_KEY: 'x-api-key',
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'authorization'
}

const createTokenPair = async (payload, publicKey, privateKey ) => {
    try {
        // accessToken
        const accessToken = await JWT.sign(payload, publicKey, {
            expiresIn: '2 days'
        })

        // refreshToken
        const refreshToken = await JWT.sign(payload, privateKey, {
            expiresIn: '7 days'
        })

        JWT.verify(accessToken, privateKey, (err, decoded) => {
            if (err) {
                console.error(`error verify::`, err)
            } else {
                console.log(`decoded verify::`, decoded)
            }
        })

        return { accessToken, refreshToken }
    } catch (error) {

    }
}

const authentication = asyncHandler( async (req, res, next) => {
    /*
    * 1 Check userId missing ???
    * 2 Get accessToken
    * 3 verifyToken
    * 4 check user in db?
    * 5 check keyStore with this userId?
    * 6 OK all => return next()
    * */

    // 1
    const userId = req.headers[HEADER.CLIENT_ID]
    if (!userId) throw new AuthFailError('Invalid Request')

    // 2
    const keyStore = await findByUserId(userId)
    if (!keyStore) throw new NotFoundError('Not found keyStore')

    // 3
    const accessToken = req.headers[HEADER.AUTHORIZATION]
    if (!accessToken) throw new AuthFailError('Invalid Request')

    try {
        const decodeUser = JWT.verify(accessToken, keyStore.publicKey)
        if (userId !== decodeUser.userId) throw new AuthFailError('Invalid Userid')
        req.keyStore = keyStore
        return next()
    } catch (error) {
        throw error
    }
})

const verifyJWT = async (token, keySecret) => {
    return await JWT.verify(token, keySecret)
}

module.exports = {
    createTokenPair,
    authentication,
    verifyJWT
}