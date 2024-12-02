const mongoose=require("mongoose")

const dbConnection=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to database");
    } 
    catch (err) {
        console.log(`Error in connecting db: ${err}`);
    }
}
module.exports=dbConnection
