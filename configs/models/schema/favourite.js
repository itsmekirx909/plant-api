const mongoose = require('mongoose')

const favProductSchema = mongoose.Schema({
    fav_product_name: String,
    fav_product_description: String,
    fav_product_image: String,
    fav_product_price: Number
})

const favProductModel = mongoose.model('favProduct', favProductSchema)

module.exports = favProductModel