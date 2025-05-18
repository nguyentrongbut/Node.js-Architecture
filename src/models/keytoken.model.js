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
    publicKey: {
        type: String,
        required: true,
        unique: true,
    },
    refreshToken: {
        type: Array,
        default: []
    }
}, {
    timestamps: true,
    collation: COLLECTION_NAME
})

// export the model
module.exports = model(DOCUMENT_NAME, keyTokenSchema)