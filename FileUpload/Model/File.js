const mongoose=require('mongoose')
require("dotenv").config()
const FileSchema=new mongoose.Schema(
    {
        name:{
          type:String,
          required:true
        },
        email:{
            type:String,
            required:true
        },
        tags:{
            type:String
        },
        imageUrl:{
            type:String
        }
},{timestamps:true});

//----------------------------------------- POST MIDDLEWARE---------------------------------------------------------

FileSchema.post("save",async function(doc){
    try {
        console.log('doc',doc)
    } 
    catch (err) {
        console.error(err)
    }
})

const file=mongoose.model('file',FileSchema);
module.exports=file;