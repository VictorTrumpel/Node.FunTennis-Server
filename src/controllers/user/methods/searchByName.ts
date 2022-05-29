import { withMethod } from "@helpers/withMethod";
import { TypedRequest } from "@commonTypes/TypedRequest";
import { AuthRequest } from "@middleware/auth";
import { DbRequest } from "@middleware/connecToDb";
import pick from "lodash.pick";
import { UserModel } from "@controllers/user/UserModel";

export const searchByName = withMethod<TypedRequest<AuthRequest & DbRequest>>(
  async (req, res) => {
    const { fullName } = pick(req.query, "fullName");

    const searchRecord: Partial<UserModel>[] = [];

    const allUsers = await req.usersCollection.find().toArray();

    allUsers.forEach((user) => {
      const secureUser: Partial<UserModel> = { ...user };
      delete secureUser.password;

      if (secureUser.fullName?.startsWith(`${fullName}`)) {
        searchRecord.push(secureUser);
      }
    });

    return res.json(searchRecord);
  }
);
