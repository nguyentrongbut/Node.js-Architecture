'use strict'

const {Schema, model} = require("mongoose");

const DOCUMENT_NAME = 'Product'
const COLLECTION_NAME = 'Products'

const productSchema = new Schema({
    product_name: {
        type: String,
        required: true,
    },
    product_description: String,
    product_thumbnail: {
        type: String,
        required: true,
    },
    product_price: {
        type: Number,
        required: true,
    },
    product_quantity: {
        type: Number,
        required: true,
    },
    product_type: {
        type: String,
        required: true,
        enum: ['Electronics', 'Clothing', 'Furniture']
    },
    product_shop: {
        type: Schema.Types.ObjectId, ref: 'Shop'
    },
    product_attributes: {
        type: Schema.Types.Mixed,
        required: true,
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})

// define the product type = clothing

const clothingSchema = new Schema({
    brand: { type: String, required: true },
    size: String,
    material: String,
    product_shop: {
        type: Schema.Types.ObjectId,
        ref: 'Shop'
    },
}, {
    collection: 'clothes',
    timestamps: true,
})

// define the product type = electronic

const electronicSchema = new Schema({
    manufacturer: { type: String, required: true },
    model: String,
    color: String,
    product_shop: {
        type: Schema.Types.ObjectId,
        ref: 'Shop'
    }
}, {
    collection: 'electronics',
    timestamps: true,
})

// export the model
module.exports = {
    product: model(DOCUMENT_NAME, productSchema),
    electronic: model('Electronics', electronicSchema),
    clothing: model('Clothing', clothingSchema),
}