const {comment}=require('../models/comment')
const like=require('../models/like');
const post=require('../models/post');

export const createComment=async(req,res)=>{
    try {
         const {body}=req.body;
         const comment=await comment.create({body});
         res.status(200).send({
            success:true,
            msg:"Comment created successfully",
            data:comment
         })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success:false,
            msg:"Error in creating comment"
        })
    }
}

// post creation-
export const createPost=async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            msg:"Error in creating a post"
        })
    }
}

// get all posts-
export const getAllPosts=async(req,res)=>{
    try {
        
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success:false,
            msg:"Error in getting all the posts"
        })
    }
}

// like the posts-
export const likePost=async(req,res)=>{
    try {
        
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success:false,
            msg:"Error in liking the posts"
        })
    }
}

// unlike all posts-
export const unlikePost=async(req,res)=>{
    try {
        
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success:false,
            msg:"Error in unliking the posts"
        });
    }
}
