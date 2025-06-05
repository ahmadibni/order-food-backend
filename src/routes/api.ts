import express from "express";
import {
  createFood,
  createManyFoods,
  getAllFoods,
  getFoodById,
} from "../controllers/food.controller";

const router = express.Router();

router.get("/foods", getAllFoods);
router.get("/foods/:id", getFoodById);
router.post("/foods", createFood);
router.post("/foods/many", createManyFoods);

export default router;
