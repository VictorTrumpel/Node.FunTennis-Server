import { ObjectId } from "mongodb";
import { UserModel } from "@controllers/user/UserModel";

export type TrainModel = {
  _id: ObjectId;
  participants: UserModel[];
  trainer: UserModel;
  date: Date;
  info: string;
};
