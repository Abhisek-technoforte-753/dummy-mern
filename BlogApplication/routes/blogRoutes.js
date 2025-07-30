const express=require("express");
const router=express.Router();
const multer = require("multer");
const authMiddleware = require("../middlewares/authmiddleware");
const upload = require("../middlewares/uploadMiddleware");
const blogController=require("../controllers/blogController");

router.post("/",authMiddleware,upload.single('image'),(err,req,res,next)=>{
    if(err instanceof multer.MulterError){
        return res.status(400).json({message:"File upload error",error:err.message});
    }else if(err){
        return res.status(400).json({message:"File upload error",error:err.message});
    }
    next();
},blogController.createBlog);
router.get("/",blogController.getBlogs);
router.get("/:id",blogController.getBlogsById);
router.put("/:id",authMiddleware,upload.single('image'),blogController.updateBlogs);
router.delete("/:id",authMiddleware,blogController.deleteBlogs);

module.exports=router;