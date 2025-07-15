const express=require("express");
const { getAllProducts, addNewProduct } = require("../controllers/productController");
const verifyToken = require("../middleware/authMiddleware");
const { updateProduct, deleteProduct } = require("../controllers/productController");

const router=express.Router();

router.get("/getall",verifyToken,getAllProducts);
router.post("/add-product",addNewProduct);

router.put("/update-product/:id",updateProduct);
router.delete("/delete-product/:id",deleteProduct);

module.exports=router;