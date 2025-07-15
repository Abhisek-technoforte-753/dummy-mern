const express=require("express");
require("dotenv").config()
const connectDB=require("./config/db")
const productRoute=require("./routes/productRoutes")
const authRoute=require("./routes/authRoutes");

const app=express();
app.use(express.json());

app.get("/home",(req,res)=>{
    res.send("home page is yet to complete");
})
app.use("/auth", authRoute);
app.use("/products",productRoute);

connectDB().then(()=>{
app.listen(process.env.PORT,()=>{
    console.log("server is running at 3001");
})
})

