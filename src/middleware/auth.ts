import { Collection, WithId } from "mongodb";
import { SessionModel } from "@models/SessionModel";
import { UserModel } from "@controllers/user/UserModel";
import { withMiddleware } from "@helpers/withMiddleware";

export type AuthRequest = {
  usersCollection: Collection<UserModel>;
  sessionsCollection: Collection<SessionModel>;
  user: WithId<UserModel> | null;
  sessionId: string;
};

export const auth = withMiddleware<AuthRequest>()(async (req, res, next) => {
  const sessionId = req.cookies["sessionId"];

  if (req.url === "/login") {
    req.user = null;
    return next();
  }

  if (!sessionId) {
    req.user = null;
    return res.status(401).json({ message: "Not authorized!" });
  }

  const session = await req.sessionsCollection.findOne({ sessionId });

  if (session) {
    req.user = await req.usersCollection.findOne({
      _id: session.userId,
    });
    req.sessionId = sessionId;
  }

  return next();
});
