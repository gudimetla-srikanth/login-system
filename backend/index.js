const express = require('express')
const cors=require('cors')
const app=express();
const dotenv = require('dotenv')
dotenv.config()
app.use(cors())
const connectDB = require('./config/database')
const router = require('./routes/userRoutes')
connectDB()
app.use(express.json())
app.use('/api/v1/',router)
app.listen(process.env.PORT,()=>{
    console.log('server has been started')
})