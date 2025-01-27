const jwt=require("jsonwebtoken")
require("dotenv").config();



exports.auth=(req,res,next)=>{
    try {
        // extract jwt token-
        // using -------------------------body extract token-
        const token=req.header("Authorisation").replace("Bearer","")
        // or token ko -----------------cookie se bhi nikal sakte aise-
        // const token=req.cookies.token
        // console.log("Cookies:", req.cookies);


        // using header extract token-
        // const token = req.header("Authorization")?.replace("Bearer ", "").trim();

        if(!token){
            return res.status(401).json({
                success:false,
                msg:"Token is missing"
            })
        }
        // ----------------------verify the token-----------------
        const decodedToken=jwt.verify(token,process.env.JWT_SECRET)
        console.log("Decoded Token:", decodedToken);

        // yaha pe token se user ka role store kar rahe hai taki aage role authorisation me use ho sake
        // yaha pe payload ko store kar liya hai-
        req.user=decodedToken
        next();
    } 
    catch (err) {
        res.status(401).send({
            success:false,
            msg:"Something went wrong while verifying jwt token",
            err
        })
    }
}

exports.isStudent=(req,res,next)=>{
    try {
    if(req.user.role!="Student"){
        console.log(user)
        return res.status(401).json({
            success:false,
            msg:"This is a protected route for student"
        });
    }
    next();
    } 
    catch (err) {
        res.status(500).send({
            success:false,
            msg:"User role is not matching"
        })
    }
}
exports.isAdmin=(req,res,next)=>{
    try {
        if(req.user.role!="Admin"){
            return res.status(401).json({
                success:false,
                msg:"This is a protected route for admin"
            })
        }
        next();
    } catch (err) {
        res.status(500).json({
            success:false,
            msg:"Admin role is not matching"
        })
    }
}