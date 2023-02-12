const mongoose = require('mongoose')

const cartProductSchema = mongoose.Schema({
    cart_product_name: String,
    cart_product_description: String,
    cart_product_image: String,
    cart_product_price: Number,
    user_id: String
})

const cartProductModel = mongoose.model('cartProduct', cartProductSchema)

module.exports = cartProductModel