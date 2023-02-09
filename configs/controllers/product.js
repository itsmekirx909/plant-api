const productModel = require("../models/schema/product");

// all product related apis
const checkoutControllers = {

    //getting products
    getProducts: (req, res)=>{

        productModel.find({}, (error, data)=>{
            if(error){
                if(error){
                    res.json({
                        message: 'Database Error',
                        status: false
                    })
                    return;
                }
            }else{
                if(!data){
                        res.json({
                            message: 'No products found',
                            status: false
                        })
                        return;
                }else{
                    res.json({
                        message: 'Products found',
                        status: true,
                        products: data
                    })
                }
            }
        })
    },

    //sending products
    sendProducts: (req, res)=>{
const {productName, productDescription, productImage, productPrice} = req.body

if( !productName || !productDescription || !productImage || !productPrice ){
    res.json({
        message: 'Required Data is missing',
        status: false
    })
    return;
}

const productObj = {
    product_name: productName,
    product_description: productDescription,
    product_image: productImage,
    product_price: productPrice
}

productModel.create(productObj, (error, data)=>{
    if(error){
        res.json({
            message: 'Database Error',
            status: false
        })
        return;
    }else{
        res.json({
            message: 'Product created',
            status: true,
            data
        })
    }
})


    }

}

module.exports = checkoutControllers