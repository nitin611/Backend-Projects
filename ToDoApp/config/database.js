const mongoose =require("mongoose")
const DbConnection = async () => {
    try {
       await mongoose.connect(process.env.MONGO_URL);
        
        console.log("Connected to database");
    } catch (err) {
        console.log(`Error in DB connection: ${err}`);
    }
};


module.exports=DbConnection