const express = require('express');
const {registerData,loginData,updateData,deleteData} = require('../controllers/userController');

const router=express.Router();

router.post('/register',registerData)
router.put('/update',updateData)
router.post('/login',loginData)
router.delete('/remove',deleteData)

module.exports = router