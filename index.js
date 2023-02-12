require('dotenv').config()
const express = require('express')
const app = express()
const dburi = process.env.DBLINK
const PORT = process.env.PORT || 7000
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const router = require('./configs/routers/app')

mongoose.connect(dburi)
.then(()=>{})
.catch((e)=>{console.log(e)})

app.use(express.json())
app.use(cors())
app.use(router)



app.listen(PORT, ()=>{})
