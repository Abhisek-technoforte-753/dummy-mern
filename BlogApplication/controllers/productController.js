const Product=require("../models/Product");

const getAllProducts=async (req,res)=>{
    try{
      const products= await Product.find();
      res.json(products);
    }catch(err){
        res.status(500).json({message:"Error in fetching data",error:err});
        // console.log("Error in fetching data",err)
    }
}

const addNewProduct=async (req,res)=>{
  const {name,price,description}=req.body;
  try{
    const newProduct=await Product.create({name,price,description});
    res.status(201).json({message:"Product Added Successfully",product:newProduct})

  }catch(err){
    res.status(500).json({message:"Error in adding products",error:err})
  }

}
const updateProduct=async (req,res)=>{
  const {id}=req.params;
  const {name,price,description}=req.body;
  try{
   const updateProduct=await Product.findByIdAndUpdate(id,{name,price,description});
   if(!updateProduct){
    return res.status(404).json({message:"Produt not found"});
   }
   res.status(200).json({message:"Product updated successsfully",product:updateProduct})

  }catch(err){
    res.status(500).json({message:"Error in update products",error:err})
  }

}

const deleteProduct=async(req,res)=>{
  const {id}=req.params;
  try{
   const deleteProduct=await Product.findByIdAndDelete(id);
   if(!deleteProduct){
    return res.status(404).json({message:"Produt not found"});
   }
      res.status(200).json({message:"Product deleted successsfully",product:deleteProduct});

  }catch(err){
    res.status(500).json({message:"Error in deleting products",error:err})
  }

}



module.exports={getAllProducts,addNewProduct,updateProduct,deleteProduct};