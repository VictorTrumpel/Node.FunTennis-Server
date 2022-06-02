import * as yup from "yup";
import { UserModel } from "@controllers/user/UserModel";

export type AddTrainFields = Partial<{
  participants: UserModel[];
  trainer: UserModel[];
  date: Date;
  info: string;
  password?: string;
}>;

const addTrainSchema = yup.object().shape({
  info: yup.string().required(),
});

export const addTrainValidate = async (trainData: AddTrainFields) => {
  return await addTrainSchema.validate(trainData, { abortEarly: true });
};
