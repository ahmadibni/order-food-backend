import mongoose from "mongoose";
import { OrderItem } from "../types/order.types";

const schema = mongoose.Schema;

const orderItemSchema = new schema<OrderItem>(
  {
    foodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const OrderItem = mongoose.model<OrderItem>("OrderItem", orderItemSchema);

export default OrderItem;
