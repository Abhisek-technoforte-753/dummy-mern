const {users}=require("../data/products")

const getAllUsers=(req,res)=>{
    res.send(users)
}

const getUserById=(req,res)=>{
      const id=parseInt(req.params.id)
      const user=users.find(p=>p.id===id);
     if(!user){
        return res.status(404).json({message:"User not found"})
     }
      res.send(user)
}

const createUser =(req,res)=>{
    const {id,name,email}=req.body;
      const existing =users.find(p=>p.id===id);
      if(existing){
        return res.status(400).json({message:"User with this id already exist"})
      };
      const newUser={id,name,email};
      users.push(newUser);
      res.status(201).json({message:"User created",Data:newUser})
}





module.exports={
    getAllUsers,
    getUserById,
    createUser,
}