import { Collection, WithId } from "mongodb";
import { Session } from "@models/Session";
import { User } from "@models/User";
import { withMiddleware } from "./withMiddleware";

export type AuthRequest = {
  usersCollection: Collection<User>;
  sessionsCollection: Collection<Session>;
  user: WithId<User> | null;
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
