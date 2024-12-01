const express =require("express")
const app =express()
const dotenv = require("dotenv");
const DbConnection = require("./config/database");

dotenv.config();
// connecting to the database-

DbConnection();








const port=process.env.PORT || 8000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})