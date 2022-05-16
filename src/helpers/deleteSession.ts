import { Collection } from "mongodb";
import { Session } from "@models/Session";

export const deleteSession = async (
  sessionsCollection: Collection<Session>,
  sessionId: string
) => {
  await sessionsCollection.deleteOne({ sessionId });
};
