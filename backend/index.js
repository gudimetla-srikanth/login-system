const express = require('express')
const cors=require('cors')
const app=express();
const dotenv = require('dotenv')
dotenv.config()
const connectDB = require('./config/database')
const router = require('./routes/userRoutes')
connectDB()
app.use(cors())
app.use(express.json())
app.use('/api/v1/',router)
app.listen(process.env.PORT,()=>{
    console.log('server has been started')
})