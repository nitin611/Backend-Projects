const express=require('express')
const app=express()
const dotenv=require('dotenv')
const user=require("./Routes/User")

const databaseConnection=require('./Config/db')

dotenv.config()
databaseConnection()

// Now middlewares-
app.use(express.json());
// now for routes-
app.use("/api/v1",user);





const port=process.env.PORT

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})