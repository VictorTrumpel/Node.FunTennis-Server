import { TypedRequest } from "@commonTypes/TypedRequest";
import { AuthRequest } from "@middleware/auth";
import { DbRequest } from "@middleware/connecToDb";
import { SignupFields, signupValidate } from "@forms/signup";
import pick from "lodash.pick";
import bcrypt from "bcrypt";
import { UserModel } from "@controllers/user/UserModel";
import { withMethod } from "@helpers/withMethod";

export const signup = withMethod<TypedRequest<AuthRequest & DbRequest>>(
  async (req, res) => {
    const fields: (keyof SignupFields)[] = ["username", "password"];
    const { username, password } = pick(req.body, ...fields) as SignupFields;

    await signupValidate(req.body);

    const isUserExists = !!(await req.usersCollection.findOne({
      username: username,
    }));

    if (isUserExists) throw new Error("UserModel already exist");

    const hashPassword = await bcrypt.hash(password as string, 5);
    const userId = await req.usersCollection.insertOne({
      ...req.body,
      password: hashPassword,
    } as UserModel);

    return res.json(userId);
  }
);
