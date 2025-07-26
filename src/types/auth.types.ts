export enum UserRole {
  Admin = "admin",
  User = "user",
  Cashier = "cashier",
}

export interface User {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}