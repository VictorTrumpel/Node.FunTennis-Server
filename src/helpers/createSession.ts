import { Collection, ObjectId } from "mongodb";
import { Session } from "@models/Session";
import { nanoid } from "nanoid";

export async function createSession(
  sessionsCollection: Collection<Session>,
  userId: ObjectId
) {
  const session = await sessionsCollection.findOne({ userId });
  const sessionId = session ? session.sessionId : nanoid();

  if (!session) {
    await sessionsCollection.insertOne({ sessionId, userId } as Session);
  }

  return sessionId;
}
