
const File=require("../Model/File")

// localFileUpload controller-
// ye pc se data leke server ke ek path pe upload kar deta hai.
// hamlog yaha pe client ke path se server ke path pe data upload kar dete hai ish controller se

exports.localFileUpload=async(req,res)=>{
    try {
        const file=req.files.file;
        console.log("file hai ye->",file);
        // __dirname -> matlab jobhi tumhari current working directory hai wo ye dikhata hai
        // server path hai ye-
        // yaha me last me + ke baad file me se .jpg ya .pdf extract kar ke laga rahe hai... .split method use kar ke 
        let path=__dirname +"/files/"+Date.now()+`.${file.name.split('.')[1]}`
        console.log("PATH->",path)

        file.mv(path ,(err)=>{
            console.log(err);
        })

        res.send({
            success:true,
            msg:"Local file uploaded successfully"
        })
    }
     catch (err) {
        res.status(500).send({
            success:false,
            msg:"Error in uploading file on the localFile Upload"
        })
    }
}


