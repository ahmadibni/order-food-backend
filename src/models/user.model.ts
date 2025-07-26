import mongoose from "mongoose";
import { User, UserRole } from "../types/auth.types";

const schema = mongoose.Schema;

const UserSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
    default: "user",
  },
});

const User = mongoose.model<User>("User", UserSchema);

export default User;