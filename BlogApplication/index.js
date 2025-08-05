const express=require("express");
require("dotenv").config()
const connectDB=require("./config/db")
const productRoute=require("./routes/productRoutes")
const commentRoutes=require("./routes/commentRoutes")
const likeRoutes=require("./routes/likeRoutes")
const authRoute=require("./routes/authRoutes")
const blogRoutes =require("./routes/blogRoutes")
const app=express();
app.use(express.json());
const path=require("path");
app.get("/home",(req,res)=>{
    res.send("home page is yet to complete");
})
app.use(express.static(path.join(__dirname,"uploads")));

// app.use("/upload",express.static(path.join(__dirname,"uploads")));
// app.use(express.static("uploads"));


app.use("/auth",authRoute);

app.use("/products",productRoute);

app.use("/blogs",blogRoutes);

app.use("/comments",commentRoutes);

app.use("/likes",likeRoutes);

connectDB().then(()=>{
app.listen(process.env.PORT,()=>{
    console.log("server is running at 3001");
})
});

