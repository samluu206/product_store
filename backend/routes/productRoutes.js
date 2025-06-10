import express from "express";
import { 
  getAllProducts, createProduct, getProduct, updateProdcut, deleteProduct 
} from "../controllers/productRoutes.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.post("/", createProduct);
router.put("/:id", updateProdcut);
router.delete("/:id", deleteProduct);

export default router;