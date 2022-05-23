import { ObjectId } from "mongodb";

export type User = {
  _id: ObjectId;
  username: string;
  fullName?: string;
  balance: number;
  level: number;
  email?: string;
  role: "student" | "coach";
  description?: string;
  password: string;
};
