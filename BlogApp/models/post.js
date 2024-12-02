const mongoose =require("mongoose")
const postSchema=new mongoose.Schema({
    Title:{
     tyep:String,
     require:true
 },
     body:{
        type:String,
        require:true
    },
    likes:{
        
    },
    comments:{

    }
},{timestamps:true});

const posts=mongoose.model("post",postSchema);
module.exports=posts;