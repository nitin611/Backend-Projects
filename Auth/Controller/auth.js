const user=require('../Model/user')
const bcrypt=require('bcrypt')


// ----------------------signup controller------------------------------------
exports.signupContoller=async(req,res)=>{
    try {
        const {name,email,password,Role}=req.body;
        // Validate input
        if (!name || !email || !password || !Role) {
            return res.status(400).send({
                success: false,
                msg: "All fields are required"
            });
        }
        // find if this user is already existed or not-
        // kya db me ish email se koi entry hai to 
        const existingUser=await user.findOne({email});
        if(existingUser){
           return  res.status(200).send({
                success:false,
                msg:"User already exist"
            })
        }
        // Now secure password-
        // yaha 10 round me hashing round ho rahi hai -
        const hashedPassword=await bcrypt.hash(password,10);

        // now db me create kardo ish user ko with hashedPassword-
        const newUser=await user.create({name,email,password:hashedPassword,Role})
        res.status(201).send({
            success:true,
            msg:"User created successfully",
            newUser
        });

    }
     catch (err) {
        console.log(err)
        res.status(500).send({
            success:false,
            msg:"signup failed, try again"
        })
    }
}





// -------------------------login controller--------------------------------------
exports.loginController=async(req,res)=>{
    try {
        const {email,password}=req.body
        if(!email || !password){
            return res.status(404).send({
                success:false,
                msg:"All details are not given"
            });

        }
        // if user does not exist then say him to signup
        const userExist=await user.findOne({email})
        if(!userExist){
            return res.status(400).send({
                success:false,
                msg:"User does not exist , kindly signup"
            });
        }
        // now validate the password-
        const hashedPassword=await user.findOne({password})
        const userPassword=password;
        bcrypt.compare(userPassword,hashedPassword,(err,res)=>{
            if(err){
                console.log('Error in compairing password',err);
                
            }
        })
        // agar password- valid nahi hai to return karo-




    } catch (err) {
        console.log(err)
        res.status(500).send({
            status:false,
            msg:"Error in login"
        })
    }
}