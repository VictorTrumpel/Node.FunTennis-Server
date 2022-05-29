import { TypedRequest } from "@commonTypes/TypedRequest";
import { AuthRequest } from "@middleware/auth";
import { DbRequest } from "@middleware/connecToDb";
import { SignupFields } from "@forms/signup";
import pick from "lodash.pick";
import { loginValidate } from "@forms/login";
import bcrypt from "bcrypt";
import { createSession } from "@helpers/createSession";
import { withMethod } from "@helpers/withMethod";

export const login = withMethod<TypedRequest<AuthRequest & DbRequest>>(
  async (req, res) => {
    const fields: (keyof SignupFields)[] = ["username", "password"];
    const { username, password } = pick(req.body, ...fields) as SignupFields;

    await loginValidate({ username, password });

    const user = await req.usersCollection.findOne({ username });

    if (!user) throw new Error("UserModel is not found!");

    const isPassword = await bcrypt.compare(password as string, user.password);

    if (!isPassword) throw new Error("Auth error!");

    const sessionId = await createSession(req.sessionsCollection, user._id);

    return res.cookie("sessionId", sessionId).json({ sessionId });
  }
);
