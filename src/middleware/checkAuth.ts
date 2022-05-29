import { withMiddleware } from "@helpers/withMiddleware";
import { WithId } from "mongodb";
import { UserModel } from "@controllers/user/UserModel";

export type AuthRequest = {
  user?: WithId<UserModel> | null;
  sessionId: string;
};

export const checkAuth = withMiddleware<AuthRequest>()(
  async (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Not authorized!" });
    return next();
  }
);
