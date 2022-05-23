import * as yup from "yup";

export type SignupFields = {
  username?: string;
  password?: string;
};

const signupSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
  fullName: yup.string().nullable(),
  balance: yup.number().required(),
  level: yup.number().required(),
  role: yup.string().required(),
  description: yup.string().nullable(),
  email: yup.string().nullable(),
});

export const signupValidate = async (userData: SignupFields) => {
  return await signupSchema.validate(userData, { abortEarly: true });
};
