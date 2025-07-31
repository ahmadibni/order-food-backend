import express from "express";
import {
  createFood,
  createManyFoods,
  getFoodById,
  getFoods,
} from "../controllers/food.controller";
import {
  createOrder,
  getOrderById,
  getOrders,
  updateStatusOrder,
} from "../controllers/order.controller";

const router = express.Router();

// Food Routes
router.get("/foods", getFoods);
router.get("/foods/:id", getFoodById);
router.post("/foods", createFood);
router.post("/foods/many", createManyFoods);

// Order Routes
router.get("/orders", getOrders);
router.get("/orders/:id", getOrderById);
router.put("/orders/:id/status", updateStatusOrder);
router.post("/orders", createOrder);

export default router;
