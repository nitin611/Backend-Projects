const express=require('express')
const router=express.Router()
const {loginController,signupContoller}=require("../Controller/auth")



router.post("/login",loginController)
router.post("/signup",signupContoller)

module.exports=router;