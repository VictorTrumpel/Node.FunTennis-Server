import * as yup from "yup";

export type SignupFields = {
  username?: string;
  password?: string;
};

const signupSchema = yup.object().shape({
  username: yup.string().required().max(20),
  password: yup.string().required().max(100),
  fullName: yup.string().required().max(100),
  email: yup.string().nullable().max(100),
  phone: yup.string().required().max(20),
  description: yup.string().nullable().max(250),
  level: yup.number().required(),
  balance: yup.number().nullable(),
  gender: yup.string().required(),
  role: yup.string().required(),
});

export const signupValidate = async (userData: SignupFields) => {
  return await signupSchema.validate(userData, { abortEarly: true });
};
