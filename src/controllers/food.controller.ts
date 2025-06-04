import { Request, Response } from "express";
import Food from "../models/food.model";

export const getAllFoods = async (req: Request, res: Response) => {
  try {
    const data = await Food.find();
    res.status(200).json({
      success: true,
      message: "Foods fetched successfully",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};
