import { Collection, ObjectId } from "mongodb";
import { SessionModel } from "@models/SessionModel";
import { nanoid } from "nanoid";

export async function createSession(
  sessionsCollection: Collection<SessionModel>,
  userId: ObjectId
) {
  const session = await sessionsCollection.findOne({ userId });
  const sessionId = session ? session.sessionId : nanoid();

  if (!session) {
    await sessionsCollection.insertOne({ sessionId, userId } as SessionModel);
  }

  return sessionId;
}
