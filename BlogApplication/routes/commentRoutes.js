const express=require("express");
const router=express.Router();
const authMiddleware = require("../middlewares/authmiddleware");
const commentController=require("../controllers/commentController");


router.get("/",commentController.getComment);
router.get("/blog/:blogId",commentController.getCommentsByBlog);

router.post("/", authMiddleware,commentController.createComment);
router.put("/:commentId", authMiddleware, commentController.updateComment);


module.exports=router;
