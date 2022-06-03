import { withMethod } from "@helpers/withMethod";
import { TypedRequest } from "@commonTypes/TypedRequest";
import { AuthRequest } from "@middleware/auth";
import { DbRequest } from "@middleware/connecToDb";
import { ObjectId } from "mongodb";

export const getTrain = withMethod<TypedRequest<AuthRequest & DbRequest>>(
  async (req, res) => {
    const pathParts = req.path.split("/");
    const id = pathParts[pathParts.length - 1];

    const train = await req.trainCollections.findOne({
      _id: new ObjectId(id),
    });

    res.json(train);
  }
);
