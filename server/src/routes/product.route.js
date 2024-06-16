import { Router } from "express";
import {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  getProductsByCategory,
} from "../controllers/product.controller.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";
import { ROLES } from "../utils/constants.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);
router.get("/category/:id", getProductsByCategory);
router.post("/add", verifyAuth(Object.values(ROLES)), addProduct);
router.put("/:id", verifyAuth(Object.values(ROLES)), updateProduct);
router.delete("/:id", verifyAuth(Object.values(ROLES)), deleteProduct);

export default router;
