
const express=require("express");
const app=express();
const userRoutes=require("./routes/userRoutes")

app.get("/",(req,res)=>{
    res.send("app running")
})
app.use("/users",userRoutes);


app.listen(3000,()=>{
    console.log("my server is running at 3000 port")
})
