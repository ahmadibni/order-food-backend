import mongoose from "mongoose";

export interface OrderItem {
  foodId: mongoose.Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
}

export const ORDER_STATUS = [
  "pending",
  "preparing",
  "delivered",
  "cancelled",
] as const;
export type OrderStatus = (typeof ORDER_STATUS)[number];

export interface Order {
  name: string;
  phone: string;
  address: string;
  items: OrderItem[];
  totalPrice: number;
  status: OrderStatus;
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
