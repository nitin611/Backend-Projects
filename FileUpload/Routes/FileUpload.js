const express=require('express')
const router=express.Router();
const {imageUpload,videoUpload,imageReducerUpload,localFileUpload}=require("../Controller/fileUpload");
// router.post("/imageUpload",imageUploadController)
router.post("/localFileUpload",localFileUpload)

module.exports=router;