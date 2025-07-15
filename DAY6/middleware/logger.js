
const logger=(req,res,next)=>{
    console.log(`${new Date().toISOString()}  1111111  ${req.method} 111 ${req.url}`);
    next()
}
module.exports=logger;