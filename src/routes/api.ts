import express from "express";
import {
  createFood,
  getAllFoods,
  getFoodById,
} from "../controllers/food.controller";

const router = express.Router();

router.get("/foods", getAllFoods);
router.get("/foods/:id", getFoodById);
router.post("/foods", createFood);

export default router;
