import { ObjectId } from "mongodb";

export type User = {
  _id: ObjectId;
  username: string;
  fullName?: string;
  balance: number;
  level: 1 | 2 | 3 | 4;
  email?: string;
  role: "student" | "coach";
  description?: string;
  password: string;
};
