const express=require("express");
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require("../controllers/productControllers");
const checkAuth = require("../middleware/checkAuth");
const validateProduct = require("../middleware/validateProduct");
const router=express.Router();

router.get("/",checkAuth,getAllProducts);
router.get("/:id",checkAuth,getProductById);
router.post("/",checkAuth,validateProduct,createProduct);
router.put("/:id",validateProduct,updateProduct);
router.delete("/:id",deleteProduct);

module.exports=router;




