import mongoose from "mongoose";

export interface OrderItem {
  foodId: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

export interface Order {
  name: string;
  phone: string;
  address: string;
  items: OrderItem[];
  totalPrice: number;
  status: "pending" | "preparing" | "delivered" | "cancelled";
}
