import mongoose from "mongoose";
import { Food } from "../types/food.types";

const schema = mongoose.Schema;

const foodSchema = new schema<Food>(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Food = mongoose.model<Food>("Food", foodSchema);

export default Food;
