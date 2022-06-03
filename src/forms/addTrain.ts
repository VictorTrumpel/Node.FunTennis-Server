import * as yup from "yup";
import { UserModel } from "@controllers/user/UserModel";

export type AddTrainFields = Partial<{
  participants: UserModel[];
  trainer: UserModel[];
  date: Date;
  info: string;
}>;

const addTrainSchema = yup.object().shape({
  participants: yup.array().required().min(1),
  trainer: yup.array().required().min(1),
  date: yup.date().required(),
  info: yup.string().nullable(),
});

export const addTrainValidate = async (trainData: AddTrainFields) => {
  return await addTrainSchema.validate(trainData, { abortEarly: true });
};
