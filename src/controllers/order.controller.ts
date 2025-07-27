import { Request, Response } from "express";
import Order from "../models/order.model";
import { OrderItem, OrderRequest } from "../types/order.types";
import Food from "../models/food.model";

export const getOrders = async (req: Request, res: Response) => {
  try {
    const data = await Order.find();
    res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export const createOrder = async (
  req: Request<{}, {}, OrderRequest>,
  res: Response
) => {
  try {
    const { name, phone, address, items } = req.body;

    if (!name || !phone || !address || !items || items.length === 0) {
      res.status(400).json({
        success: false,
        message: "All fields are required",
      });
      return;
    }

    const orderItems: OrderItem[] = [];
    let totalPrice = 0;

    for (const item of items) {
      const food = await Food.findById(item.foodId);

      if (!food) {
        res.status(404).json({
          success: false,
          message: "Food not found",
        });
        return;
      }

      const price = food.price;
      totalPrice += price * item.quantity;

      const orderItem: OrderItem = {
        foodId: item.foodId,
        name: food.name,
        quantity: item.quantity,
        price,
      };

      orderItems.push(orderItem);
    }

    const order = new Order({
      name,
      phone,
      address,
      items: orderItems,
      totalPrice,
    });

    const result = await order.save();

    res.status(201).json({
      success: true,
      message:
        "Your order has been placed successfully. We're preparing it now!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : String(error),
    });
  }
};
