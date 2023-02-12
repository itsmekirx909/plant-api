const express = require('express')
const credentials = require('../controllers/credentials')
const checkout = require('../controllers/checkout')
const product = require('../controllers/product')
const router = express.Router()

router.post('/api/login', credentials.login)


router.post('/api/signup', credentials.signUp)


router.delete('/api/deleteuser', credentials.deleteUser)


router.put('/api/addtocart', checkout.addToCart)


router.put('/api/addtofavourites', checkout.addToFavourites)


router.put('/api/removefromcart', checkout.removeFromCart)

router.put('/api/removecart', checkout.removeCart)

router.put('/api/removefromfavourites', checkout.removeFromFavourites)

router.put('/api/removefavourites', checkout.removeFavourites)

router.put('/api/checkout', checkout.checkout)


router.get('/api/getproducts', product.getProducts)

router.post('/api/sendproducts', product.sendProducts)




module.exports = router