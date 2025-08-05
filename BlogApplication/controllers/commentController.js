const Comment =require("../models/Comment");
const Blog=require("../models/Blogs");

exports.createComment=async (req,res)=>{
   console.log(req.body,"req.body in comment controller");
   try{
   const  {text,blog}=req.body;
   const blogdata=await Blog.findById(blog);
   if(!blogdata){
    return res.status(404).json({message:"Blog not found"});
   }
   
   const comment =new Comment({
    text,
    user:req.user.id,
    blog:blogdata._id
   });
   await comment.save();
   console.log(blogdata,"blogdata after comment save",comment);

   // Add comment to blog's comments array
   blogdata.comments.push(comment._id);
   await blogdata.save();

   await comment.populate("user", "username role");
   res.status(201).json({message:"Comment created successfully",comment});

    }catch(err){
       console.error("Error in createComment:", err);
       res.status(400).json({message:"Comment creation failed",error:err.message})
    }
}

exports.getCommentsByBlog=async (req,res)=>{

    try{
        const {blogId}= req.params;
        console.log(blogId,"11111111")

       const comments=await Comment.find({blog:blogId}).populate("user","username").populate("blog","title");
       res.status(200).json({comment:comments})
    }catch(err){
       res.status(400).json({message:"Comment response failed",error:err})

    }

}
exports.getComment=async (req,res)=>{
     try{
    
       const comments=await Comment.find().populate("user","username").populate("blog","title");
       res.status(200).json({comment:comments})
    }catch(err){
       res.status(400).json({message:"Comment response failed",error:err})

    }
}

exports.updateComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { text } = req.body;
        const updated = await Comment.findByIdAndUpdate(
            commentId,
            { text },
            { new: true }
        ).populate("user", "username role");
        if (!updated) {
            return res.status(404).json({ message: "Comment not found" });
        }
        res.status(200).json({ message: "Comment updated", comment: updated });
    } catch (err) {
        res.status(400).json({ message: "Update failed", error: err.message });
    }
};