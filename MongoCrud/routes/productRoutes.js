const express=require("express");
const { getAllProducts, addNewProduct } = require("../controllers/productController");
const verifyToken = require("../middleware/authMiddleware");

const router=express.Router();

router.get("/getall",verifyToken,getAllProducts);
router.post("/add-product",addNewProduct);

module.exports=router;