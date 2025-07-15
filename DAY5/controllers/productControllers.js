const products=require("../data/products")

const getAllProducts=(req,res)=>{
    res.send(products)
}

const getProductById=(req,res)=>{
      const id=parseInt(req.params.id)
      const product=products.find(p=>p.id===id);
     if(!product){
        return res.status(404).json({message:"Product not found"})
     }
      res.send(product)
}

const createProduct=(req,res)=>{
    const {id,name,price}=req.body;
      const existing =products.find(p=>p.id===id);
      if(existing){
        return res.status(400).json({message:"Product with this id already exist"})
      };
      const newProduct={id,name,price};
      products.push(newProduct);
      res.status(201).json({message:"Product created",Data:newProduct})
}

const updateProduct=(req,res)=>{
    const id= parseInt(req.params.id);
    const {name,price}=req.body;
    const index=products.findIndex(p=>p.id==id);
    
    if(index===-1){
        return  res.status(404).json({message:"Products not fount"})
    }
    products[index]={...products[index],name,price};
    res.json({message:"Product is updated"})

}

const deleteProduct=(req,res)=>{
    const id=parseInt(req.params.id);
    const index=products.findIndex(p=>p.id==id);
    if(index===-1){
        return res.status(404).json({message:"Product not found"})
    }
    products.splice(index,1);
    res.status(204).send({message:"Deleted"})
}

module.exports={
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}