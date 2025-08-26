const jwt=require("jsonwebtoken")
const JWT_SECRET=process.env.JWT_SECRET;
const authMiddleware=(req,res,next)=>{
   
    const authHeader=req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token)
    if(!token){
        return res.status(401).json({message:"No tokens provided"});
    }
    try{
        const decoded=jwt.verify(token,JWT_SECRET);
        req.user=decoded;
        next()
    }catch(err){
          return res.status(401).json({message:"Invalid or expired token"});
    }
}

module.exports=authMiddleware;
