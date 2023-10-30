const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'your@gmail.com',
        pass:'yourpassword'
    }
})

module.exports={transporter}