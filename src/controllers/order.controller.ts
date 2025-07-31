import { Request, Response } from "express";
import Order from "../models/order.model";
import { ORDER_STATUS, OrderItem, OrderRequest } from "../types/order.types";
import Food from "../models/food.model";

export const getOrders = async (req: Request, res: Response) => {
  try {
    const data = await Order.find().sort({ createdAt: -1 });
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

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await Order.findById(id);

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

export const updateStatusOrder = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { status } = req.body;

  try {
    if (!status) {
      res.status(400).json({
        success: false,
        message: "Status is required",
      });
      return;
    }

    if (!ORDER_STATUS.includes(status)) {
      res.status(400).json({
        success: false,
        message: "Status is required",
      });
      return;
    }

    const data = await Order.findByIdAndUpdate(
      id,
      {
        status,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!data) {
      res.status(404).json({
        success: false,
        message: "Order not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
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

    const tax = 0.1;
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

    const taxTotal = tax * totalPrice;
    const grandTotal = taxTotal + totalPrice;

    const order = new Order({
      name,
      phone,
      address,
      items: orderItems,
      totalPrice: grandTotal,
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
