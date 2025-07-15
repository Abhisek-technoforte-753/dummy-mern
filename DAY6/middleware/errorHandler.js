
const errorHandler=(err,req,res,next)=>{
   console.log(err.stack);
   res.status(500).json({message:"Internal server error",error:err.message});

}
module.exports=errorHandler;