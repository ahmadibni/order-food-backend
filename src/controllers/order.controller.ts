import { Request, Response } from "express";
import Order from "../models/order.model";

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

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { name, phone, address, items, totalPrice, status } = req.body;

    const order = new Order({
      name,
      phone,
      address,
      items,
      totalPrice,
      status,
    });

    const result = await order.save();

    res.status(201).json({
      status: true,
      message: "Order created successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : String(error),
    });
  }
};
