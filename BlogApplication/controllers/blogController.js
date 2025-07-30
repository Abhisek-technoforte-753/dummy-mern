const Blog =require("../models/Blogs")
const fs = require('fs');
const path = require('path');

exports.createBlog=async (req,res)=>{
    try{
     console.log("Request body:", req.body);
     console.log("Request file:", req.file);
     console.log("Request headers:", req.headers);
     
     const {title,content}=req.body;
     
     // Handle image upload
     let imageUrl = null;
     if (req.file) {
         imageUrl = `/uploads/${req.file.filename}`;
         console.log("Image uploaded:", imageUrl);
     } else {
         console.log("No file uploaded");
     }
     
     const blog=new Blog({
        title,
        content,
        author:req.user.id,
        image: imageUrl
     });
     console.log(blog,"blog data 111111111")
     await blog.save();
     res.status(201).json(blog);
     
    }catch(err){
       console.log("Error creating blog:", err);
       res.status(400).json({message:"Blog Not Created",error:err});
    }
}

exports.getBlogs=async (req,res)=>{
    try{
     const blogs =await Blog.find();
     console.log(blogs,"blogs data")
     res.status(200).json(blogs)
    

    }catch(err){
         res.status(500).json({error:err});
    }
}

exports.getBlogsById=async (req,res)=>{
    try{
      const blog=await Blog.findById(req.params.id);
      if(!blog){
        return res.status(404).json({message:"No blog found with this id"})
      }
      res.status(200).json(blog);
    }catch(err){
              res.status(500).json({error:err});
    }
}

exports.deleteBlogs=async (req,res)=>{
    try{
      const blog=await Blog.findById(req.params.id);
      if(!blog){
        return res.status(404).json({message:"No blog found with this id"})
      }
      
      // Check if user is authorized to delete this blog
      if(blog.author.toString()!==req.user.id){
        return res.status(403).json({error:"Unauthorized - You can only delete your own blogs"})
      }
      
      // Delete associated image file if it exists
      if(blog.image){
        const imagePath = path.join(__dirname, '..', blog.image);
        console.log("Attempting to delete image:", imagePath);
        
        // Check if file exists before trying to delete
        if(fs.existsSync(imagePath)){
          fs.unlinkSync(imagePath);
          console.log("Image file deleted successfully");
        } else {
          console.log("Image file not found:", imagePath);
        }
      }
      
      // Delete the blog from database
      await Blog.findByIdAndDelete(req.params.id);
      
      res.status(200).json({message:"Blog deleted successfully"});
      
    }catch(err){
      console.log("Error deleting blog:", err);
      res.status(500).json({error:err.message});
    }
}

exports.updateBlogs=async (req,res)=>{
    try{
      const blog=await Blog.findById(req.params.id);
      console.log(blog);
      if(!blog){
        return res.status(404).json({message:"No blog found with this id"})
      }
     console.log(blog.author.toString(),"id compare",req.user.id)
     if(blog.author.toString()!==req.user.id){
        return res.status(403).json({error:"Unauthorized"})
     };
     
     // Handle image upload for update
     if (req.file) {
         blog.image = `/uploads/${req.file.filename}`;
     }
     
     blog.title=req.body.title ||  blog.title;
     blog.content=req.body.content ||  blog.content;
     await blog.save();
    res.status(200).json(blog);

    }catch(err){
              res.status(500).json({error:err});
    }
}
