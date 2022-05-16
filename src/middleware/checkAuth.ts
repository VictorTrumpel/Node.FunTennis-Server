import { withMiddleware } from "@middleware/withMiddleware";
import { WithId } from "mongodb";
import { User } from "@models/User";

export type AuthRequest = {
  user?: WithId<User> | null;
  sessionId: string;
};

export const checkAuth = withMiddleware<AuthRequest>()(
  async (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Not authorized!" });
    return next();
  }
);
