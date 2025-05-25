'use strict'

const {product, clothing, electronic} = require('../models/product.model')
const {BadRequestError} = require("../core/error.response");

// define Factory class to create product
class ProductFactory {
    /*
    * type: 'Clothing',
    * payload
    * */
    static async createProduct(type, payload) {
        switch (type) {
            case 'Electronics':
                return new Electronics(payload).createProduct();
            case 'Clothing':
                return new Clothing(payload).createProduct();
            default:
                throw new BadRequestError(`Invalid Product Types '${type}'`);
        }
    }

}

// define base product class
class Product {
    constructor({
                    product_name,
                    product_description,
                    product_thumbnail,
                    product_price,
                    product_quantity,
                    product_type,
                    product_shop,
                    product_attributes,
                }) {
        this.product_name = product_name;
        this.product_description = product_description;
        this.product_thumbnail = product_thumbnail;
        this.product_price = product_price;
        this.product_quantity = product_quantity;
        this.product_type = product_type;
        this.product_shop = product_shop;
        this.product_attributes = product_attributes;
    }

    // create new product
    async createProduct(product_id) {
        return await product.create({...this, _id: product_id});
    }
}


// define sub-class for different product types Clothing
class Clothing extends Product {
    async createProduct() {
        const newClothing = await clothing.create({
            ...this.product_attributes,
            product_shop: this.product_shop,
        });
        if (!newClothing) throw new BadRequestError("create new Clothing error");

        const newProduct = await super.createProduct(newClothing._id)
        if (!newProduct) throw new BadRequestError("create new Product error");

        return newProduct;
    }
}

// define sub-class for different product types Electronics
class Electronics extends Product {
    async createProduct() {
        const newElectronics = await electronic.create({
            ...this.product_attributes,
            product_shop: this.product_shop,
        });
        if (!newElectronics) throw new BadRequestError("create new Electronics error");

        const newProduct = await super.createProduct(newElectronics._id);
        if (!newProduct) throw new BadRequestError("create new Product error");

        return newProduct;
    }
}

module.exports = ProductFactory;