import { TypedRequest } from "@commonTypes/TypedRequest";
import { AuthRequest } from "@middleware/auth";
import { DbRequest } from "@middleware/connecToDb";
import { ObjectId } from "mongodb";
import { UserModel } from "@controllers/user/UserModel";
import { withMethod } from "@helpers/withMethod";

export const getUser = withMethod<TypedRequest<AuthRequest & DbRequest>>(
  async (req, res) => {
    const pathParts = req.path.split("/");
    const id = pathParts[pathParts.length - 1];

    const user = await req.usersCollection.findOne({
      _id: new ObjectId(id),
    });

    const protectedUser: Partial<UserModel> = { ...user };
    delete protectedUser["password"];

    res.json(protectedUser);
  }
);
