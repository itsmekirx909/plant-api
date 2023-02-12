const SignUpModel = require('../models/schema/signup')

// all cart related apis (all post api)
const checkoutControllers = {
    addToCart: async (req, res)=>{
        const {cartProductName, cartProductDescription, cartProductImage, cartProductPrice, userId} = req.body

if(!cartProductName || !cartProductDescription || !cartProductImage || !cartProductPrice || !userId){
    res.json({
        message: 'Could not get product data',
        status: false
    })
    return;
}

const updatedData = {
    cart_product_name: cartProductName,
    cart_product_description: cartProductDescription,
    cart_product_image: cartProductImage,
    cart_product_price: cartProductPrice,
}

let oldData;

SignUpModel.findById({_id: userId}, (error, data)=>{
    if(error){
        res.json({
            message: 'Database error',
            status: false
        })
        return;
    }else{
        if(!data){
            res.json({
                message: 'No user logged in',
                status: false
            })
        }else{
            oldData = data.cart
            oldData.push(updatedData)


            SignUpModel.findOneAndUpdate({_id: userId}, {cart: oldData}, (error, data)=>{
                if(error){
                    res.json({
                        message: 'No user logged in',
                        status: false
                    })
                    return;
                }else{
                        res.json({
                            message: 'Added to cart',
                            status: true,
                        })
                }
                
                })
    }
}
})

    },
    addToFavourites: (req, res)=>{
        const {favProductName, favProductDescription, favProductImage, favProductPrice, userId} = req.body

        if(!favProductName || !favProductDescription || !favProductImage || !favProductPrice || !userId){
            res.json({
                message: 'Could not get product data',
                status: false
            })
            return
        }

        const updatedData = {
            fav_product_name: favProductName,
            fav_product_description: favProductDescription,
            fav_product_image: favProductImage,
            fav_product_price: favProductPrice,
        }
        
        let oldData;
        
        SignUpModel.findById({_id: userId}, (error, data)=>{
            if(error){
                res.json({
                    message: 'Database error',
                    status: false
                })
                return;
            }else{
                if(!data){
                    res.json({
                        message: 'No user logged in',
                        status: false
                    })
                }else{
                    oldData = data.favourites
                    oldData.push(updatedData)
        

                    SignUpModel.findOneAndUpdate({_id: userId}, {favourites: oldData}, (error, data)=>{
                        if(error){
                            res.json({
                                message: 'No user logged in',
                                status: false
                            })
                            return;                              
                        }else{
                   
                                res.json({
                                    message: 'Added to favourites',
                                    status: true,
                                })
                            
                        }
                        
                        })
            }
        }
        })
        
    },
    removeFromCart: (req, res)=>{
        const {cartProductName, cartProductDescription, cartProductImage, cartProductPrice, userId} = req.body

        if(!cartProductName || !cartProductDescription || !cartProductImage || !cartProductPrice || !userId){
            res.json({
                message: 'Could not get product data',
                status: false
            })
            return;
        }

        const updatedData = {
            cart_product_name: cartProductName,
            cart_product_description: cartProductDescription,
            cart_product_image: cartProductImage,
            cart_product_price: cartProductPrice,
            user_id: userId
        }
        
        let oldData;
        
        SignUpModel.findById({_id: userId}, (error, data)=>{
            if(error){
                res.json({
                    message: 'Database error',
                    status: false
                })
                return;
            }else{
                if(!data){
                    res.json({
                        message: 'No user logged in',
                        status: false
                    })
                }else{
                    oldData = data.cart

                    if(oldData.length === 0){
                        res.json({
                            message: 'Nothing is in the cart',
                            status: false
                        })
                        return;
                    }

                    let removeIndex ;
                    oldData.map((e, i)=>{
                        if(e.cart_product_name == updatedData.cart_product_name && e.cart_product_description == updatedData.cart_product_description ){
                            removeIndex = i
                        }
                    })

                    const deletedData = oldData.splice(removeIndex, 1)
        
        
                    SignUpModel.findOneAndUpdate({_id: userId}, {cart: oldData}, (error, data)=>{
                        if(error){
                            res.json({
                                message: 'No user logged in',
                                status: false
                            })
                            return;
                        }else{
                                res.json({
                                    message: 'Removed from cart',
                                    status: true,
                                })
                        }
                        
                        })
            }
        }
        })
    },
    removeCart: (req, res)=>{
        const {userId} = req.body

        if(!userId){
            res.json({
                message: 'No user logged in',
                status: false
            })
            return;
        }
        
        const updatedData = []
        
        let oldData;
        
        SignUpModel.findById({_id: userId}, (error, data)=>{
            if(error){
                res.json({
                    message: 'Database error',
                    status: false
                })
                return;
            }else{
                if(!data){
                    res.json({
                        message: 'No user logged in',
                        status: false
                    })
                }else{     
        
                    SignUpModel.findOneAndUpdate({_id: userId}, {cart: updatedData}, (error, data)=>{
                        if(error){
                            res.json({
                                message: 'No user logged in',
                                status: false
                            })
                            return;
                        }else{
                                res.json({
                                    message: 'Cart removed',
                                    status: true,
                                })
                        }
                        
                        })
            }
        }
        })
        
    },
    removeFromFavourites: (req, res)=>{
        const {favProductName, favProductDescription, favProductImage, favProductPrice, userId} = req.body

        if(!favProductName || !favProductDescription || !favProductImage || !favProductPrice || !userId){
            res.json({
                message: 'Could not get product data',
                status: false
            })
            return;
        }

        const updatedData = {
            fav_product_name: favProductName,
            fav_product_description: favProductDescription,
            fav_product_image: favProductImage,
            fav_product_price: favProductPrice,
            user_id: userId
        }
        
        let oldData;
        
        SignUpModel.findById({_id: userId}, (error, data)=>{
            if(error){
                res.json({
                    message: 'Database error',
                    status: false
                })
                return;
            }else{
                if(!data){
                    res.json({
                        message: 'No user logged in',
                        status: false
                    })
                }else{
                    oldData = data.favourites

                    if(oldData.length === 0){
                        res.json({
                            message: 'Nothing is in the favourites',
                            status: false
                        })
                        return;
                    }

                    let removeIndex ;
                    oldData.map((e, i)=>{
                        if(e.fav_product_name == updatedData.fav_product_name && e.fav_product_description == updatedData.fav_product_description ){
                            removeIndex = i
                        }
                    })

                    const deletedData = oldData.splice(removeIndex, 1)
        
        
                    SignUpModel.findOneAndUpdate({_id: userId}, {favourites: oldData}, (error, data)=>{
                        if(error){
                            res.json({
                                message: 'No user logged in',
                                status: false
                            })
                            return;
                        }else{
                                res.json({
                                    message: 'Removed from favourites',
                                    status: true,
                                })
                        }
                        
                        })
            }
        }
        })
    },
    removeFavourites: (req, res)=>{
        const {userId} = req.body

        if(!userId){
            res.json({
                message: 'No user logged in',
                status: false
            })
            return;
        }
        
        const updatedData = []
        
        let oldData;
        
        SignUpModel.findById({_id: userId}, (error, data)=>{
            if(error){
                res.json({
                    message: 'Database error',
                    status: false
                })
                return;
            }else{
                if(!data){
                    res.json({
                        message: 'No user logged in',
                        status: false
                    })
                }else{     
        
                    SignUpModel.findOneAndUpdate({_id: userId}, {favourites: updatedData}, (error, data)=>{
                        if(error){
                            res.json({
                                message: 'No user logged in',
                                status: false
                            })
                            return;
                        }else{
                                res.json({
                                    message: 'Favourites removed',
                                    status: true,
                                })
                        }
                        
                        })
            }
        }
        })

    },
    checkout:(req, res)=>{

        const {userId} = req.body

        SignUpModel.findById({_id: userId}, (error, data)=>{
            if(error){
                res.json({
                    message: 'Database error',
                    status: false
                })
                return;
            }else{
                if(!data){
                    res.json({
                        message: 'No user logged in',
                        status: false
                    })
                }else{

if(data.cart.length === 0){
res.json({
    message: 'There are no items in the cart',
    status: false
})
return;
}

                    const cartData = data.cart
                    let oldDataCheckout 

                    oldDataCheckout = data.checkouts

                    oldDataCheckout.push(cartData)

                    
        
                    SignUpModel.findOneAndUpdate({_id: userId}, {checkouts: oldDataCheckout, cart: []}, (error, data)=>{
                        if(error){
                            res.json({
                                message: 'No user logged in',
                                status: false
                            })
                            return;
                        }else{
                                res.json({
                                    message: 'Items checked out',
                                    status: true,
                                })
                        }
                        
                        })
            }
        }
        })
    },
}

module.exports = checkoutControllers