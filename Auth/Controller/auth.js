const user=require('../Model/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const { options } = require('../Routes/User');

// load .env configuration -

require("dotenv").config();

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
// login steps-
// 1.) fetch email id and password-
// 2.) do validation of email and password pura data aaya hai ki nahi
// 3.) check kiya if user is regestered or not agar not registerd then return.
// 4.) compare kiya password ko , agar passowrd wrong hai to return password galat hai,
// 5.) agar password match- token create kardiya
// 6.) and existing user me token pass kar diya,
// 7.) Now cokkie create kiya and json pass kar diya- token , user, ye sab




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
        // now validate the password  
        // const hashedPassword=await user.findOne({password})
        // const userPassword=password;
        // bcrypt.compare(userPassword,hashedPassword,(err,res)=>{
        //     if(err){
        //         console.log('Error in compairing password',err);
                
        //     }
        // })
        const payload={
            email:userExist.email,
            id:userExist._id,
            role:userExist._role,
        }
        // verify password and generate jwt token-
        if(await bcrypt.compare(password,userExist.password)){
            // agar password match hua to login karwa do and generate jwt -
            // create token-
            let token=jwt.sign(payload,
                                process.env.JWT_SECRET,
                                {
                                    expiresIn:"2h",
                                });
            
            // send token in response of user-
    // -------1.)userExist is a Mongoose document fetched via user.findOne(). When you modify its properties (userExist.token and userExist.password), those changes are not saved to the database

//           2.) Mongoose provides the toObject() method, which converts the document into a plain      JavaScript object. This allows modifications to be reflected in the response.
            const userResponse = userExist.toObject();
            userResponse.token = token;
            userResponse.password = undefined;

            // create cookie in the response-
            // cookie me 3 parameter- 1.) cookie name,
            //                         2.)cookie data , 3.) options
            const options={
                // expire hoga cookie 3 days me-
               expires:new Date(Date.now()+3*24*60*60*1000),
            //    client side me ni hoga 
               httpOnly:true
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                userExist:userResponse,
                msg:"User logged in successfully"
            })

        }
        else{
            return res.status(403).send({
                success:false,
                msg:"password incorrect"
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).send({
            status:false,
            msg:"Error in login"
        })
    }
}