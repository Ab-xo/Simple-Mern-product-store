import express from "express";
import { addProduct, deleteProduct, getAllProducts, updateProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", addProduct);
// GET: Get all products
router.get("/", getAllProducts);
// PUT: Update product by ID
router.put("/:id", updateProduct);
// DELETE: Delete product by ID
router.delete("/:id", deleteProduct);

export default router;
