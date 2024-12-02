const express=require("express")
const app=express();
const dotenv=require("dotenv");
const dbConnection = require("./config/db");
const blog=require('./routes/BlogRoutes')

dotenv.config();
dbConnection();

// middlewares-
app.use(express.json());
// mount-
app.use("/api/v1",blog)


const port=process.env.PORT || 8000;



app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);

})