const mongoose=require('mongoose')
const nodemailer=require('nodemailer')
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
// to send email after successful uploading the image in cloudinary so using post middleware
// we can send mail confirmation to the user .
// jo bhi entry database me create hui hai wahi yaha doc me aaraha hai wahi doc hai-
FileSchema.post("save",async function(doc){
    try {
        console.log('doc',doc)
        // transporter create karo using nodemailer-
        let transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        });
        // send email -
        let info=await transporter.sendMail({
            from:`NitinJha`,
            to:doc.email,
            subject:"New file uploaded on cloudinary",
            html:`<h2>Welcome</h2> <p>File uploaded successfully</p> view here: <a href="${doc.imageUrl}">${doc.imageUrl}</a>`
        })
        console.log("Info",info)
    } 

    catch (err) {
        console.error(err)
    }
})

const file=mongoose.model('file',FileSchema);
module.exports=file;