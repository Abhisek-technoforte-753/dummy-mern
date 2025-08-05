const express=require("express");
const router=express.Router();
const authMiddleware = require("../middlewares/authmiddleware");
const blogController=require("../controllers/blogController");
const multer  = require('multer');
const upload = require("../middlewares/uploadMiddleware");

router.post("/",authMiddleware,upload.single('image'),blogController.createBlog);
router.get("/",blogController.getBlogs);
router.get("/:id",blogController.getBlogsById);
router.put("/:id",authMiddleware,blogController.updateBlogs);
router.delete("/:id",blogController.deleteBlogs);

module.exports=router;