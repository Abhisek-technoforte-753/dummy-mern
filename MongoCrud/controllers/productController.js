const Product=require("../models/Product");

 const getAllProducts=async (req,res)=>{
    try{
      const products= await Product.find();
      res.json(products);
    }catch(err){
        res.status(500).json({message:"Error in fetching data",error:err})
        // console.log("Error in fetching data",err)
    }
};
 const addNewProduct=async (req,res)=>{
    const {name,price,description}=req.body;

    try{
        const newProduct=await Product.create({name,price,description});
        res.status(201).json({message:"Product added successfully",product:newProduct});
    }catch(err){
        res.status(500).json({message:"Error in adding product",error:err});
    }
};
module.exports={getAllProducts,addNewProduct};
