const mongoose =require("mongoose");

const blogSchema= new mongoose.Schema({
    title:{type:String,required:true},
    content:{type:String,require:true},
    author:{type:mongoose.Schema.Types.ObjectId,ref:'User',require:true},
    image:{type:String,default:null},
    comments:[{type:mongoose.Schema.Types.ObjectId,ref:'Comment'}],
    likes:[{type:mongoose.Schema.Types.ObjectId,ref:'Like'}],
    createdAt:{type:Date,default:Date.now()}
});
module.exports=mongoose.model("Blog",blogSchema);