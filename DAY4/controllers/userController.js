
exports.getUsers=(req,res)=>{
    res.send(["User1","User2","User3"])
}

exports.getUsersTwo=(req,res)=>{
    res.status(201).send(["abc","def","ghe"])
}