const mongoose=require('mongoose')
require("dotenv").config();

const databaseConnection=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        .then(()=>{console.log("db conncected successfully")})
    } 
    catch (err) {
        
        console.log('db connection issue')
    }
}
module.exports=databaseConnection;