'use strict'

const {Schema, model} = require("mongoose");

const DOCUMENT_NAME = 'Key'
const COLLECTION_NAME = 'Keys'

const keyTokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Shop'
    },
    privateKey: {
        type: String,
        required: true,
        unique: true,
    },
    publicKey: {
        type: String,
        required: true,
        unique: true,
    },
    refreshTokensUsed: {
        type: Array,
        default: [] // những RT đã được sử dụng
    },
    refreshToken: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})

// export the model
module.exports = model(DOCUMENT_NAME, keyTokenSchema)