import { ObjectId } from "mongodb";
import { UserModel } from "@controllers/user/UserModel";

export type TrainModel = {
  _id: ObjectId;
  participants: UserModel["_id"][];
  trainer: UserModel["_id"];
  date: Date;
  info: string;
};
