
const File=require("../Model/File")

// ----------------------------localFileUpload controller---------------------------------------------
// hamlog yaha pe client ke path se server ke path pe data upload kar dete hai ish controller se

exports.localFileUpload=async(req,res)=>{
    try {
        //----------------------- 4 steps for uploading file in local storage are:-

        // 1.) ------------------------file fetch from request-
        const file=req.files.file;
        console.log("file hai ye->",file);
        // __dirname -> matlab jobhi tumhari current working directory hai wo ye dikhata hai
        // server path hai ye-

        // 2.)--------------------create path where file need to be stored on local server-----------
         // yaha me last me + ke baad file me se .jpg ya .pdf extract kar ke laga rahe hai... .split method use kar ke so .extension de raha hai file me se last wala part
        let path=__dirname +"/files/"+Date.now()+`.${file.name.split('.')[1]}`
        console.log("PATH->",path)

        // 3.) ---------------------move file from local storage to server defined path-------------------
        file.mv(path ,(err)=>{
            console.log(err);
        })
// 4.) ---------------------------------CREATE A SUCCESS RESPONSE---------------------------------------
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

// -------------------------------image upload handler------------------------------------




