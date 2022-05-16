import { ObjectId } from "mongodb";

export type Session = {
  _id: ObjectId;
  sessionId: string;
  userId: ObjectId;
};
