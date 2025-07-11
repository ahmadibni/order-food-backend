import { Request, Response } from "express";
import Food from "../models/food.model";
import { FoodInput } from "../types/food.types";

export const getFoods = async (req: Request, res: Response) => {
  try {
    const foods = await Food.find();
    const data = foods.map((food) => ({
      ...food.toObject(),
      image: `${req.protocol}://${req.get("host")}/${food.image}`,
    }));

    res.status(200).json({
      success: true,
      message: "Foods fetched successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export const getFoodById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const food = await Food.findById(id);

    const data = {
      ...food?.toObject(),
      image: `${req.protocol}://${req.get("host")}/${food?.image}`,
    }
    res.status(200).json({
      success: true,
      message: "Foods fetched successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export const createFood = async (req: Request, res: Response) => {
  try {
    const { name, price, description, image, category } = req.body;

    const food = new Food({
      name,
      price,
      description,
      image,
      category,
    });

    await food.save();

    res.status(201).json({
      success: true,
      message: "Food created successfully",
      data: food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export const createManyFoods = async (req: Request, res: Response) => {
  try {
    const foods: FoodInput[] = req.body.foods;

    await Promise.all(foods.map((food) => Food.create(food)));

    res.status(201).json({
      success: true,
      message: "Foods created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : String(error),
    });
  }
};
