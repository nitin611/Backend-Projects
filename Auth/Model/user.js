const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    Role:{
        type:String,
        enum:["Admin","Student","Visitor"]
    }
},{timestamps:true});

module.exports=mongoose.model("user",userSchema);