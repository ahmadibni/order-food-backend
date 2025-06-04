import express from "express";
import { getAllFoods } from "../controllers/food.controller";

const router = express.Router();

router.get("/foods", getAllFoods);

export default router;
