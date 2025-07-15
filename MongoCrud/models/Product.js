const mongoose=require("mongoose");

const productSchema= new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  price:{
    type:Number
  }
})

const Product=mongoose.model("Products",productSchema);

module.exports=Product;
