const express=require("express");
require("dotenv").config()
const connectDB=require("./config/db")
const productRoute=require("./routes/productRoutes")
const authRoute=require("./routes/authRoutes")
const blogRoutes =require("./routes/blogRoutes")
const path = require("path");
const app=express();
app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get("/home",(req,res)=>{
    res.send("home page is yet to complete");
})

app.use("/auth",authRoute);

app.use("/products",productRoute);

app.use("/blogs",blogRoutes);

connectDB().then(()=>{
app.listen(process.env.PORT,()=>{
    console.log("server is running at 3001");
})
});

