const mongoose=require("mongoose");

const TodoSchema=new mongoose.Schema({
    title:{
        type: String,
        required:true,
        maxLength:50
    },
    description:{
        type: String,
        required:true,
        maxLength:50
    }

},{ timestamps: true });

const Todo=mongoose.model("todo",TodoSchema);

module.exports=Todo;