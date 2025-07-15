const express=require("express");
const productRoutes=require("./routes/productRoutes")
const userRoutes=require("./routes/userRoutes");
const logger = require("./middleware/logger");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
require('dotenv').config()
const port=process.env.PORT;

const app=express()
app.use(express.json());
console.log(process.env.URL);

// const logger=(req,res,next)=>{
//     console.log(`${new Date()} ${req.method} ${req.url}`);
//     next()
// }
// const logger2=(req,res,next)=>{
//     console.log(`${new Date()} 1111111111111111111 ${req.method} ${req.url}`);
//     next()
// }
// app.use(logger);
// app.use(logger2);
app.use(logger);


app.get("/",(req,res)=>{
    res.send("first application");
})

app.use("/products",productRoutes)

app.use("/users",userRoutes);

// app.get("/error-test",(req,res,next)=>{
//   const err=new Error("This is test error");
//   next(err)
// })

app.use(notFound);
app.use(errorHandler)

app.listen(port ,()=>{
  console.log(`Server is running on http://localhost:${port}`);
})

