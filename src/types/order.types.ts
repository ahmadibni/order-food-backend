import mongoose from "mongoose";

export interface OrderItem {
  foodId: mongoose.Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  name: string;
  phone: string;
  address: string;
  items: OrderItem[];
  totalPrice: number;
  status: "pending" | "preparing" | "delivered" | "cancelled";
}

export interface OrderItemRequest {
  foodId: mongoose.Types.ObjectId;
  quantity: number;
}

export interface OrderRequest {
  name: string;
  phone: string;
  address: string;
  items: OrderItemRequest[];
}
