const express = require('express')
const credentials = require('../controllers/credentials')
const checkout = require('../controllers/checkout')
const product = require('../controllers/product')
const router = express.Router()

router.post('/api/login', credentials.login)


router.post('/api/signup', credentials.signUp)


router.delete('/api/deleteuser', credentials.deleteUser)


router.post('/api/addtocart', checkout.addToCart)


router.post('/api/addtofavourites', checkout.addToFavourites)


router.post('/api/removefromcart', checkout.removeFromCart)


router.post('/api/removefromfavourites', checkout.removeFromFavourites)


router.post('/api/checkout', checkout.checkout)


router.get('/api/getproducts', product.getProducts)

router.post('/api/sendproducts', product.sendProducts)




module.exports = router