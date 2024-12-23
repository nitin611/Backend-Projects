const express=require('express')
const router=express.Router();
const {imageUpload,videoUpload,imageReducerUpload,localFileUpload}=require("../Controller/fileUpload");
// router.post("/imageUpload",imageUploadController)
router.post("/localFileUpload",localFileUpload)
router.post("/imageUpload",imageUpload)
router.post("/videoUpload",videoUpload)
router.post("/imageReduceUpload",imageReducerUpload)
module.exports=router;