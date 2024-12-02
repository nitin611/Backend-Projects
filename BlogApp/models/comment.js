const mongoose=require("mongoose");

// kon se post pe comment kiya hai -
const CommentSchema=new mongoose.connect({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"posts"
    },
    body:{
        type:String,
        require:true
    }
},{ timestamps: true });

const Comment=mongoose.model("comment",CommentSchema);
module.exports=Comment;