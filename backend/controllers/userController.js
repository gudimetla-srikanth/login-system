const userModel = require('../model/UserModel')
const jsonwebtoken = require('jsonwebtoken')
const {transporter} = require('../utils/mail')
const bcrypt=require('bcrypt')
const registerData = async(req,res)=>{
    try{
    const data=req.body;
const salt= await bcrypt.genSalt(10)
const hashedPassword=await bcrypt.hash(data.password,salt)
    const userdata=await userModel.create({
        name:data.username,
        email:data.email,
        password:hashedPassword
    })
    const token  = jsonwebtoken.sign({token_id : userdata._id},"secretkey");
    const mailOptions = {
        from:'your@gmail.com',
        to:'yourTo0@gmail.com',
        subject:'Sending email from node js',
        text:'You are registered in our database'
    }
     transporter.sendMail(mailOptions,(err,info)=>{
        if(err){
            console.log(err)
        }else{
            console.log(info)
        }
    })
    console.log("registered")
    return res.json({success:true,token:token})
    }catch(err){
       return res.json({success:false,error:err})
    }
}

const loginData = async(req,res)=>{
    try{
    const data=req.body;
    const userdata=await userModel.findOne({
        email:data.email,
    })
    const comparePassword = await bcrypt.compare(data.password,userdata.password)
    if(comparePassword){
        const token  = jsonwebtoken.sign({token_id : userdata._id},"secretkey");
        const mailOptions = {
            from:'your@gmail.com',
        to:'yourTo0@gmail.com',
            subject:'Sending email from node js',
            text:'You are logged in our database'
        }
        transporter.sendMail(mailOptions,(err,info)=>{
            if(err){
                console.log(err)
            }else{
                console.log(info)
            }
        })

        console.log("login",data)
        return res.json({success:true,token:token})
    }
    return res.json({success:false})
    }catch(err){
        return res.json({success:false,error:err})
    }
}
const updateData = async(req,res)=>{
    try{
    const data=req.body;
    const salt= await bcrypt.genSalt(10)
const hashedPassword=await bcrypt.hash(data.password,salt)
    const userdata=await userModel.updateOne({
        email:data.email,
    },{$set:{password:hashedPassword}})
    console.log(userdata)
    const mailOptions = {
        from:'your@gmail.com',
        to:'yourTo0@gmail.com',
        subject:'Sending email from node js',
        text:'Your data got updated in our database'
    }
     transporter.sendMail(mailOptions,(err,info)=>{
        if(err){
            console.log(err)
        }else{
            console.log(info)
        }
    })
    console.log("updated")
    return res.json({success:true})
    }catch(err){
        return res.json({success:false,error:err})
    }
}
const deleteData = async(req,res)=>{
    try{
    const data=req.body;
    const userdata=await userModel.deleteOne({
        email:data.email,
    })
    console.log(userdata)
    const mailOptions = {
        from:'your@gmail.com',
        to:'yourTo0@gmail.com',
        subject:'Sending email from node js',
        text:'You are deleted from our database'
    }
     transporter.sendMail(mailOptions,(err,info)=>{
        if(err){
            console.log(err)
        }else{
            console.log(info)
        }
    })
    console.log('deleted')
    return res.json({success:true})
    }catch(err){
        return res.json({success:false,error:err})
    }
}

module.exports = {registerData,updateData,loginData,deleteData}