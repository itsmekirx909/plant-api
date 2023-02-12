require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SignUpModel = require('../models/schema/signup')

// all authentication related apis (all post api)
const checkoutControllers = {
    signUp: async (req, res)=>{
        const { firstName, lastName, userName, email, password, confirmPassword, phoneNo} = req.body
    
req.body.authority = 'User'

        if( !firstName || !lastName || !userName || !email || !password || !confirmPassword || !phoneNo ){
            res.json({
                message: 'Required inputs are missing',
                status: false
            })
            return;
        }

        if(password !== confirmPassword){
            res.json({
                message: 'Passwords are not same',
                status: false
            })
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const userData = {
            first_name: firstName,
            last_name: lastName,
            username: userName,
            email: email,
            password: hashedPassword,
            phone_no: phoneNo,
            cart: [],
            favourites: [],
            checkouts: [],
            authority: req.body.authority
        }

        SignUpModel.find({email: email}, (error, data)=>{
            if(error){
                res.json({
                    message: 'Database Error',
                    status: false
                })
                return;
            }else{
                if(data.length > 0){
                    res.json({
                        message: 'Email is already used',
                        status: false
                    })
                    return;

                }else{

const token = jwt.sign(userData, process.env.SECRET_KEY)

userData.token = token

SignUpModel.create(userData, (e, d)=>{
    if(e){
        res.json({
            message: 'Database Error',
            status: false
        })
    }else{

        res.json({
            message: "User Signed Up",
            status: true,
            userInfo: d
        })
    }
})

                }

            }
        })
    
    },

    login: (req, res)=>{
        const { email, password} = req.body

        if(!email || !password){
            res.json({
                message: 'Required inputs are missing',
                status: false
            })
        }

SignUpModel.findOne({email}, async (error, data)=>{
if(error){
    res.json({
        message: 'Database Error',
        status: false
    })
}else{

if(!data){
    res.json({
        message: 'Invalid Input',
        status: false
    })
}else{

    const comparePassword = await bcrypt.compare(password, data.password)

    if(comparePassword){

const userVerify = await jwt.verify(data.token, process.env.SECRET_KEY)

        res.json({
            message: `Welcome ${data.username}`,
            status: true,
            userInfo: data
        })
    }else{
        res.json({
            message: 'Invalid Input',
            status: false
        })
    }

}

}

})

    },

    deleteUser: (req, res)=>{
        const {id} = req.body

        SignUpModel.findByIdAndDelete({ _id: id }, (error, data)=>{
            if(error){
                res.json({
                    message: 'Database Error',
                    status: false
                })
                return;
            }else{
                if(!data){
                    res.json({
                        message: 'No user found',
                        status: false
                    })
                }else{
                    res.json({
                        message: 'User deleted',
                        status: true,
                        data
                    })
                }
            }
        })
    },

}

module.exports = checkoutControllers