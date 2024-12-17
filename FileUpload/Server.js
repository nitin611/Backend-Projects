const express=require("express")
const app=express();
const { connect } = require('./Config/db');
const {cloudinary}=require('./Config/cloudinary')
require("dotenv").config()

// --------------------------Connect to the database---------------------
connect();

// ----------------------------cloud se conncect karo----------------------
cloudinary()

// ------------------------------middlewares------------------------------
app.use(express.json());

// --------------------------------file-upload middleware------------------

const fileUpload=require("express-fileupload")
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  }));

//----------------------------------- routes--------------------------

const upload=require("./Routes/FileUpload")
app.use('/api/v1/upload',upload);


// --------------------------------port and server running-----------------
const PORT=process.env.PORT || 8000

app.listen(PORT ,()=>{
    console.log(`Server is running on port ${PORT}`);
})