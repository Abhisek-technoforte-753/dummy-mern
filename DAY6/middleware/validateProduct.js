
const validateProduct=(req,res,next)=>{
   const {name,price}= req.body;
   if(!name || typeof name!=="string"){
    return res.status(400).json({message:"Name is required and must be a string"});
   }
 if(!price || typeof price !=="number"){
    return res.status(400).json({message:"Price is required and must be a number"});
   }
   next();
}

module.exports=validateProduct;