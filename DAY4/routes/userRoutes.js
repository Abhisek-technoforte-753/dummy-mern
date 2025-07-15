const express=require("express");
const { getUsers, getUsersTwo } = require("../controllers/userController");

const router=express.Router();

router.get("/",getUsers);
router.get("/two",getUsersTwo)


module.exports=router;

