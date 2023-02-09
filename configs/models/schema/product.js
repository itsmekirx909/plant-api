const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    product_name: String,
    product_description: String,
    product_image: String,
    product_price: Number
})

const productModel = mongoose.model('product', productSchema)

module.exports = productModel