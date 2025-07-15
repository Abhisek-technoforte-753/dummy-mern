
const checkAuth=(req,res,next)=>{
   const token=req.headers["authorization"];

   if(token=="Bearer mysecrettoken"){
    next()
   }else{
    res.status(401).json({message:"Unauthorized user"})
   }
};
module.exports=checkAuth;

//5 min code break