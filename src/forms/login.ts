import * as yup from "yup";

export type LoginFields = {
  username?: string;
  password?: string;
};

const loginSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

export const loginValidate = async (userData: LoginFields) => {
  return await loginSchema.validate(userData, { abortEarly: true });
};
