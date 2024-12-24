
const File=require("../Model/File")
const cloudinary=require("cloudinary").v2

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
         // yaha  last me + ke baad file me se .jpg ya .pdf extract kar ke laga rahe hai... .split method use kar ke so .extension de raha hai file me se last wala part
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

function isFileTypeSupported(type,supportedImage){
        // jpeg,png sab check karo
        return supportedImage.includes(type)
}

// function for uploading file on cloudinary-
 async function uploadFileToCloudinary(file,folder,quality){
    const options={folder}
    // by default file type ko detect karo-
    if(quality){
        options.quality=quality
    }
    options.resource_type="auto"
   
    return await cloudinary.uploader.upload(file.tempFilePath,options)
 }

exports.imageUpload=async(req,res)=>{
    try {
        // data fetch
        const {name,tags,email}=req.body
        // --------------------------------file fetch-----------------------------
        const file=req.files.imageFile
        console.log(file)

        //-------------------------- validation of image--------------------------
        const supportedImage=["jpg","png","jpeg"]
        const fileType=file.name.split('.')[1].toLowerCase()

        if(!isFileTypeSupported(fileType,supportedImage)){
            return res.status(400).send({
                success:false,
                msg:"File type not supported"
            })
        }


        //------------------------ now upload on cloudinary------------------------------
        const response=await uploadFileToCloudinary(file,"FileUploadProject")
        console.log(response)
        // database me entry save karo-
        const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        })
        res.status(200).send({
            success:true,
            imageUrl:response.secure_url,
            msg:"Image uploaded successfully"
            
        })
    } catch (err) {
        res.status(500).send({
            success:false,
            msg:'error in uploading image'
        })
    }
}

exports.videoUpload=async(req,res)=>{
    try {
        // data fetch-
        const {name,email,tags}=req.body;
        console.log(name,tags,email);
        const file=req.files.videoFile;
        // validation of video files-
        const supportedTypes=["mp4","mov"];
        const fileType=file.name.split('.')[1].toLowerCase();
        console.log("fileType is:",fileType);

        // add video limit of 100mb-
         if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                msg:'File format not supported'
            })
         }
         console.log("uploading...")
        //  upload to cloudinary-
        const response=await uploadFileToCloudinary(file,"FileUploadProject")
        console.log(response)
        // database me entry save karo-
        const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        })
        res.status(200).send({
            success:true,
            imageUrl:response.secure_url,
            msg:"video uploaded successfully"
            
        })
    } catch (err) {
        res.status(500).json({
            success:false,
            msg:"Error in uploading video file"
        })
    }
}

// image compress- compress the image size and upload in cloudinary -
exports.imageReducerUpload=async(req,res)=>{
    try {
        // data fetch
        const {name,tags,email}=req.body
        // --------------------------------file fetch-----------------------------
        const file=req.files.imageFile
        console.log(file)

        //-------------------------- validation of image--------------------------
        const supportedImage=["jpg","png","jpeg"]
        const fileType=file.name.split('.')[1].toLowerCase()

      
        if(!isFileTypeSupported(fileType,supportedImage)){
            return res.status(400).send({
                success:false,
                msg:"File type not supported"
            })
        }


        //------------------------ now upload on cloudinary------------------------------
          // yaha pe file ko reduce karo-
        const response=await uploadFileToCloudinary(file,"FileUploadProject",90)
        console.log(response)
        // database me entry save karo-
        const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        })
        res.status(200).send({
            success:true,
            imageUrl:response.secure_url,
            msg:"Image uploaded successfully"
            
        })
    } catch (err) {
        res.status(500).send({
            success:false,
            msg:'Error in reducing size and uploading'
        })
        
    }
}



