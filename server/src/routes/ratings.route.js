import { Router } from "express";
import {
  getAllReviews,
  addReview,
  updateReview,
  deleteReview,
} from "../controllers/ratings.controller.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";
import { ROLES } from "../utils/constants.js";

const router = Router();

router.get("/:id", getAllReviews);
router.post("/add", verifyAuth(Object.values(ROLES)), addReview);
router.put("/:id", verifyAuth(Object.values(ROLES)), updateReview);
router.delete("/:id", verifyAuth(Object.values(ROLES)), deleteReview);

export default router;
