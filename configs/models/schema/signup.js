const mongoose = require('mongoose')

const signUpSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    username: String,
    email: String,
    password: String,
    confirm_password: String,
    phone_no: Number,
    authority: String,
    cart: Array,
    favourites: Array,
    checkouts: Array,
    token: String
})

const SignUpModel = mongoose.model('user', signUpSchema)

module.exports = SignUpModel