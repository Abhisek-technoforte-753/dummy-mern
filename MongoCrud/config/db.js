const mongoose=require("mongoose");

const connectDB=async ()=>{
    try{
       await mongoose.connect(process.env.URL);
       console.log("MongoDb is connected Successfully")
    }catch(err){
      console.log("MongoDb connection failed",err)
    }
   
}
module.exports=connectDB;

