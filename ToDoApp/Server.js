const express =require("express")
const app =express()
const dotenv = require("dotenv");
const DbConnection = require("./config/database");
const todoRoutes=require("./routes/Todo")

dotenv.config();
// connecting to the database-

DbConnection();

// middlewares to parse json request body-
app.use(express.json());
app.use("/api/v1",todoRoutes)








const port=process.env.PORT || 8000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})