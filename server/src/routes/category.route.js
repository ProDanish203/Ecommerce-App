import { Router } from "express";
import {
  addCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/category.controller.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";
import { ROLES } from "../utils/constants.js";

const router = Router();

router.get("/", getCategories);
router.post("/add", verifyAuth(Object.values(ROLES)), addCategory);
router.put("/:id", verifyAuth(Object.values(ROLES)), updateCategory);
router.delete("/:id", verifyAuth(Object.values(ROLES)), deleteCategory);

export default router;
