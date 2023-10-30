const mongoose = require('mongoose')

const connectDB =async ()=>{
    await mongoose.connect(process.env.MONGO_URL).then(con=>console.log('connection success')).catch(err=> console.log(err))
}

module.exports=connectDB