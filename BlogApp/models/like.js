const mongoose =require("mongoose")
const likeSchema=new mongoose.Schema({
        Flag:{

            require:true,
            
        }
},{timestamps:true});

const like=mongoose.model("like",likeSchema);
module.exports=like;