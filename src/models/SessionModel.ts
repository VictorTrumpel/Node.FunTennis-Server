import { ObjectId } from "mongodb";

export type SessionModel = {
  _id: ObjectId;
  sessionId: string;
  userId: ObjectId;
};
