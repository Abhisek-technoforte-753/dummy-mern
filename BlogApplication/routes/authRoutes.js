const express=require("express");
const User = require("../models/User");
const router=express.Router();
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");


const JWT_SECRET=process.env.JWT_SECRET
router.post("/register",async (req,res)=>{
    const {username,role,password}=req.body;
    try{
        const hashed=await bcrypt.hash(password,10)
        console.log(password,hashed,username,"password =====>")
        const user=await User.create({username,role,password:hashed});
        res.status(200).json({message:"User registered",user:user});
    }catch(err){
      res.status(400).json({message:"User registeration failed",error:err});
    }
});
router.post("/login",async (req,res)=>{
    const {username,password}=req.body;

    try{
        const user =await User.findOne({username})
        if(!user){
            res.status(404).json({message:"user not found"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return  res.status(404).json({message:"Invalid Credential"});
        }
        const token=jwt.sign({id:user._id,role:user.role},JWT_SECRET,{expiresIn:"1h"});
        res.json({message:"Login successful",token});
        console.log(isMatch,"match result",user,password)
    }catch(err){
   res.status(404).json({});
    }
})

module.exports=router;