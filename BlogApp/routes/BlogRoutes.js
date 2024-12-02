const express=require("express")
const router=express.Router();
const {createComment,createPost,getAllPosts,likePost,unlikePost}=require('../controller/Blog')

router.post("/comments/create",createComment);
router.post("/posts/create",createPost);
router.get("/posts",getAllPosts);
router.post("/likes/like",likePost);
router.post("/likes/unlike",unlikePost);

module.exports=router;