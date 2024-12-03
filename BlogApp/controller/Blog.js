const Comment=require('../models/comment')
const Like=require('../models/like');
const Post = require('../models/post');


exports.createComment=async(req,res)=>{
    try {
        // fetch data from body-
         const {post,user,body}=req.body;
        //  1st method of creation post inside db
        //  const comment=await comment.create({post,user,body});

        // 2nd method of creating post inside db-
        const comment=new Comment({
            post,user,body
        })

        const savedComment=await comment.save();
        // find the post by id and update the comment with that id-
        // jo post hai uske andar user ne comment kiya to pehle uss post ko search karo and then uske
        // andar new comment add kardo-

        // new true means updated post return karna-
        // populate se -jo bhi actual document hai ush id se related usko fetch karsakte hai using
        // populate -se actual comment and data aate hai aise sirf id
        const updatedPost=await Post.findByIdAndUpdate(post,{$push:{comments:savedComment._id}},{new:true}).populate("comments").exec()


         res.status(200).send({
            post:updatedPost,
            success:true,
            msg:"Comment created successfully",
            
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
exports.createPost=async(req,res)=>{
    try {
        const {title,body}=req.body;
        const post=new Post({
            title,body
        });
        const savedPost=await post.save();
        res.status(200).send({
            success:true,
            post:savedPost
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            msg:"Error in creating a post"
        })
    }
}

// get all posts-
exports.getAllPosts=async(req,res)=>{
    try {
        // without populate bash id aayega with populate comments,likes ka data bhi aayega-
        const post=await Post.find().populate("comments").populate("likes").exec();
        res.status(200).send({
            success:true,
            post
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success:false,
            msg:"Error in getting all the posts"
        })
    }
}

// like the posts-
// like ke andar postid,userka naam ye do cheeze hongi
exports.likePost=async(req,res)=>{
    try {
        const {post,user}=req.body;
        const like=new Like({post,user});
        const savedLike=await like.save();

        // update the post collection based on this similar to comment -
        // when we like this post update the like inside this post-
        const updatedPost=await Post.findByIdAndUpdate(post,{$push:{likes:savedLike._id}},{new:true}).populate("likes");
        res.status(200).send({
            success:true,
            msg:"Post like successfully",
            Post:updatedPost
        })
       
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success:false,
            msg:"Error in liking the posts"
        })
    }
}

// unlike all posts-
//same post ko multiple log like kar sakte hai so - only delte on the basis of like id.
// or can do post,like id dono ke basis pe dono id ke basis pe
exports. sunlikePost=async(req,res)=>{
    try {
        
        const {post,like}=req.body;
        // jish bhi pehli entry ke andar ye dono parameter mil jayegi to usko delete kardo-
        // case - 1 findby id and delete se directly ho sakta hai-
        
        // case -2 - dono id se find karo and delete karo usko-
        const deletedLike=await Like.findOneAndDelete({post:post,_id:like});
        
        // now update the post collection jaise pehle kiya tha-
        const updatedPost=await Post.findByIdAndDelete(post,{$pull:{likes:deletedLike._id}},{new:true})
        res.status(200).send({
            success:true,
            post:updatedPost,
            msg:"Post is unliked successfully"
        })


    } catch (err) {
        console.log(err)
        res.status(500).send({
            success:false,
            msg:"Error in unliking the posts"
        });
    }
}

