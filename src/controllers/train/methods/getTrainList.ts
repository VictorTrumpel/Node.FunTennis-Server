import { withMethod } from "@helpers/withMethod";
import { TypedRequest } from "@commonTypes/TypedRequest";
import { AuthRequest } from "@middleware/auth";
import { DbRequest } from "@middleware/connecToDb";

export const getTrainList = withMethod<TypedRequest<AuthRequest & DbRequest>>(
  async (req, res) => {
    const train = await req.trainCollections.find(req.query).toArray();
    res.json(train);
  }
);
