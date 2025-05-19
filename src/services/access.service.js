'use strict'

const shopModel = require('../models/shop.model')
const bcrypt = require('bcrypt')
// const crypto = require('crypto')
const crypto = require('node:crypto')

const KeyTokenService = require('./keyToken.service')
const {createTokenPair} = require("../auth/authUtils");
const {getInfoData} = require("../utils");
const {BadRequestError, AuthFailError} = require("../core/error.response");

// service ///
const {findByEmail} = require("../services/shop.service");
// service ///

const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
}

class AccessService {

    /*
    *  1 check email in db
    *  2 match password
    *  3 create AT vs RT and save db
    *  4 generate tokens
    *  5 get data return login
    * */
    static login = async ({email, password, refreshToken = null}) => {

        // 1.check email in db
        const foundShop = await findByEmail({email})
        if (!foundShop) throw new BadRequestError('Error: Shop not registered!')

        // 2.match password
        const match = bcrypt.compare(password, foundShop.password)
        if (!match) throw new AuthFailError('Error: Authentication error!')

        // 3.
        // created privateKey, publicKey
        const privateKey = crypto.randomBytes(64).toString('hex')
        const publicKey = crypto.randomBytes(64).toString('hex')

        // 4.generate tokens
        const {_id: userId} = foundShop
        const tokens = await createTokenPair({
                userId,
                email
            },
            publicKey,
            privateKey
        )

        await KeyTokenService.createKeyToken({
            userId,
            refreshToken: tokens.refreshToken,
            privateKey,
            publicKey,
        })

        return {
            shop: getInfoData({
                fileds: ['_id', 'name', 'email'], object: foundShop
            }),
            tokens
        }
    }

    static signUp = async ({name, email, password}) => {

        // step1: check email exists??

        const holderShop = await shopModel.findOne({email}).lean()

        console.log("holderShop", holderShop)
        if (holderShop) {
            throw new BadRequestError('Error: Shop already registered!')
        }

        const passwordHash = await bcrypt.hash(password, 10)

        const newShop = await shopModel.create({
            name, email, password: passwordHash, roles: [RoleShop.SHOP]
        })

        if (newShop) {
            // create privateKey, publicKey
            const privateKey = crypto.randomBytes(64).toString('hex')
            const publicKey = crypto.randomBytes(64).toString('hex')

            console.log({privateKey, publicKey}) // save collection KeyStore

            const keyStore = await KeyTokenService.createKeyToken({
                userId: newShop._id,
                publicKey,
                privateKey
            })

            if (!keyStore) {
                throw new BadRequestError('Error: Create KeyStore failed!')
            }

            // created token pair
            const tokens = await createTokenPair({
                    userId: newShop._id,
                    email
                },
                publicKey,
                privateKey
            )

            console.log(`Created Token Success::`, tokens)

            return {
                code: 201,
                metadata: {
                    shop: getInfoData({
                        fileds: ['_id', 'name', 'email'], object: newShop
                    }),
                    tokens
                }
            }
        }

        return {
            code: 200,
            metadata: null
        }
    }
}

module.exports = AccessService