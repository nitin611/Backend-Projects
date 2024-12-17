const mongoose=require('mongoose')
require("dotenv").config()

exports.connect=async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        .then(()=>{
            console.log("Db connected successfully")
        })
    }
     catch (err) {
        console.log("error in db connnection")
    }
}