'use strict'

const keyTokenModel = require('../models/keytoken.model')
const {Types} = require("mongoose");

class KeyTokenService {

    static createKeyToken = async ({userId, publicKey, privateKey, refreshToken }) => {
        try {
            // level 0
            // const tokens = await keyTokenModel.create({
            //     user: userId,
            //     publicKey,
            //     privateKey
            // })
            //
            // return tokens ? tokens.publicKey : null

            // level xxx
            const filter = {user: userId}, update = {
                publicKey,
                privateKey,
                refreshTokenUsed: [],
                refreshToken
            }, options = {upsert: true, new: true}

            const tokens = await keyTokenModel.findOneAndUpdate(filter, update, options)

            return tokens ? tokens.publicKey : null
        } catch (error) {
            return error
        }
    }

    static findByUserId = async (userId) => {
        return await keyTokenModel.findOne({ user: new Types.ObjectId(userId) })
    }

    static removeKeyById = async (id) => {
        return await keyTokenModel.deleteOne(id)
    }

    static findByRefreshTokenUsed = async (refreshToken) => {
        return await keyTokenModel.findOne({ refreshTokensUsed: refreshToken }).lean()
    }

    static findByRefreshToken = async (refreshToken) => {
        return await keyTokenModel.findOne({ refreshToken }).lean()
    }

    static updateKeyTokenById = async (id, update) => {
        return await keyTokenModel.findByIdAndUpdate(id, update, { new: true });
    }

    static deleteKeyById = async (userId) => {
        return await keyTokenModel.deleteOne({ user: userId })
    }

}

module.exports = KeyTokenService