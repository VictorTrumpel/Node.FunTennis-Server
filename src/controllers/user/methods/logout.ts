import { TypedRequest } from "@commonTypes/TypedRequest";
import { AuthRequest } from "@middleware/auth";
import { DbRequest } from "@middleware/connecToDb";
import { deleteSession } from "@helpers/deleteSession";
import { withMethod } from "@helpers/withMethod";

export const logout = withMethod<TypedRequest<AuthRequest & DbRequest>>(
  async (req, res) => {
    if (!req.user) throw new Error("No user");
    await deleteSession(req.sessionsCollection, req.sessionId);
    res.clearCookie("sessionId").json({ message: "success" });
  }
);
