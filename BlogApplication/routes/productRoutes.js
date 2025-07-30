const express=require("express");
const { getAllProducts,addNewProduct,updateProduct,deleteProduct} = require("../controllers/productController");
const authMiddleware = require("../middlewares/authmiddleware");
const rolesMiddleware=require("../middlewares/roleMiddleware");
const router=express.Router();

router.get("/getall",authMiddleware,rolesMiddleware("user"),getAllProducts);
router.post("/add-product",rolesMiddleware("admin"),addNewProduct);
router.put("/update-product/:id",updateProduct);
router.delete("/delete-product/:id",deleteProduct);


module.exports=router;