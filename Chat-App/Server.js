const http=require("http")
const express=require("express")
const path=require('path')
const app=express();
const server=http.createServer(app);
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));




server.listen(4000,()=>console.log(`Server is running on port 4000`));
