import { TypedRequest } from "@commonTypes/TypedRequest";
import { AuthRequest } from "@middleware/auth";
import { DbRequest } from "@middleware/connecToDb";
import { UserModel } from "@controllers/user/UserModel";
import { withMethod } from "@helpers/withMethod";

export const getUserList = withMethod<TypedRequest<AuthRequest & DbRequest>>(
  async (req, res) => {
    const users = await req.usersCollection.find(req.query).toArray();
    const usersSecurity = users.map((user) => {
      const securityUser: Partial<UserModel> = {
        ...user,
      };
      delete securityUser["password"];
      return securityUser;
    });

    res.json(usersSecurity);
  }
);
