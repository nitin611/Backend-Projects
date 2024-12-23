const express=require("express")
const app=express();
const { connect } = require('./Config/db');
const fileUploade = require('express-fileupload');
require("dotenv").config()

// --------------------------Connect to the database---------------------
connect();
// ------------------------------middlewares------------------------------
// app.use(express.json());
// // Enable express-fileupload middleware
// app.use(fileUploade({
//   useTempFiles: true,        // Enables temporary file storage
//   tempFileDir: '/tmp/',      // Directory for temp files
//   debug: true                // Optional: Logs more details for debugging
// }));

// --------------------------------file-upload middleware------------------
const {cloudinary}=require('./Config/cloudinary')
// ----------------------------cloud se conncect karo----------------------
cloudinary()
const fileUpload=require("express-fileupload")
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles : true,
    tempFileDir : '/tmp/'
  }));

//----------------------------------- routes--------------------------

const upload=require("./Routes/FileUpload")
app.use('/api/v1/upload',upload);


// --------------------------------port and server running-----------------
const PORT=process.env.PORT || 8000

app.listen(PORT ,()=>{
    console.log(`Server is running on port ${PORT}`);
})