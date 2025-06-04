import mongoose from "mongoose";
import { DATABASE_URL } from "./env";

const connect = async () => {
  try {
    const conn = await mongoose.connect(DATABASE_URL, {
      dbName: "order-food",
    });
    console.log("Database connected successfully: " + conn.connection.host);
  } catch (error) {
    console.error("Database connection error:", error);
    throw new Error("Failed to connect to the database");
  }
};

export default connect;
