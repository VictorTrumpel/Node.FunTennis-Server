import * as yup from "yup";

export type SignupFields = {
  username?: string;
  password?: string;
};

const signupSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

export const signupValidate = async (userData: SignupFields) => {
  return await signupSchema.validate(userData, { abortEarly: true });
};
