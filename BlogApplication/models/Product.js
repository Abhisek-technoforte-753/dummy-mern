const mongoose=require("mongoose");

const productSchema= new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  price:{
    type:Number
  },
  description:{
     type:String
  }
  
})

const Product=mongoose.model("Products",productSchema);

module.exports=Product;
