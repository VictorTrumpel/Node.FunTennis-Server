import { TypedRequest } from "@commonTypes/TypedRequest";
import { AuthRequest } from "@middleware/auth";
import { DbRequest } from "@middleware/connecToDb";
import { withMethod } from "@helpers/withMethod";

export const auth = withMethod<TypedRequest<AuthRequest & DbRequest>>(
  (req, res) => res.json(req.user)
);
