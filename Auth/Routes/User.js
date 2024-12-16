const express=require('express')
const router=express.Router()
const {loginController,signupContoller}=require("../Controller/auth")
const {auth,isAdmin,isStudent}=require("../Middlewares/auth");

router.post("/login",loginController)
router.post("/signup",signupContoller)

// --------------------------------protected routes---------------------------------
// test-----

router.get("/test",auth,(req,res)=>{
    res.send({
        success:true,
        msg:"Test inside me"
    })
})
// ------------------------------ADMIN PANEL--------------------------------
router.get("/admin",auth,isAdmin,(req,res)=>{
        res.send({
            success:true,
            msg:"Inside admin panel"
        });
});
// --------------------------------Student panel-------------------------------
router.get("/student",auth,isStudent,(req,res)=>{
    res.send({
        success:true,
        msg:"Inside student panel"
    })
})

module.exports=router;