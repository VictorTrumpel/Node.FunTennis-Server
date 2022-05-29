import { TypedRequest } from "@commonTypes/TypedRequest";
import { AuthRequest } from "@middleware/auth";
import { DbRequest } from "@middleware/connecToDb";
import { SignupFields, signupValidate } from "@forms/signup";
import pick from "lodash.pick";
import cloneDeep from "lodash.clonedeep";
import { withMethod } from "@helpers/withMethod";

export const updateUser = withMethod<TypedRequest<AuthRequest & DbRequest>>(
  async (req, res) => {
    const fields: (keyof SignupFields)[] = ["username", "password"];
    const { username } = pick(req.body, ...fields) as SignupFields;

    await signupValidate(req.body);

    const dispatchInf = cloneDeep(req.body);
    delete dispatchInf["password"];
    delete dispatchInf["_id"];

    await req.usersCollection.updateOne(
      { username: { $eq: username } },
      { $set: { ...dispatchInf } }
    );

    res.json({ message: "success" });
  }
);
