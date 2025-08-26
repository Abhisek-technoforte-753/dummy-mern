const express=require("express");
const User = require("../models/User");
const router=express.Router();
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");


const JWT_SECRET=process.env.JWT_SECRET
// router.post("/register",async (req,res)=>{
//     const {username,role,password,address}=req.body;
//     try{
//         const hashed=await bcrypt.hash(password,10)
//         console.log(password,hashed,username,"password =====>")
//         const user=await User.create({username,role,address,password:hashed});
//         res.status(200).json({message:"User registered",user:user});
//     }catch(err){
//       res.status(400).json({message:"User registeration failed",error:err});
//     }
// });


router.post("/register", async (req, res) => {
    const { username, email, contactNumber, password, address } = req.body;
    
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ 
            $or: [{ email }, { username }] 
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email or username"
            });
        }

        // Hash password and create user
        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            contactNumber,
            password: hashed,
            address,
            role: 'user' // Default role
        });

        // Remove password from response
        user.password = undefined;

        res.status(201).json({
            success: true,
            message: "User registered successfully. Please login.",
            user
        });

    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({
            success: false,
            message: "Registration failed",
            error: err.message
        });
    }
});
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: "1d" }
        );

        // Remove password from response
        user.password = undefined;

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user
        });

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({
            success: false,
            message: "Login failed",
            error: err.message
        });
    }
});

module.exports=router;