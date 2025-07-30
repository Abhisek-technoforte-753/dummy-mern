
module.exports=function rolesAllowed(...allowedRoles){
    return (req,res,next)=>{
        const user=req.user;
        console.log(user,"9999999",allowedRoles);
        if(!user){
            return res.status(403).json({message:"No user role found ,Access denied"})
        }
        if(!allowedRoles.includes(user.role)){
            return res.status(403).json({message:"don't have permission"})
        }
        next()
    }
}