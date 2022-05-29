import { Collection } from "mongodb";
import { SessionModel } from "@models/SessionModel";

export const deleteSession = async (
  sessionsCollection: Collection<SessionModel>,
  sessionId: string
) => {
  await sessionsCollection.deleteOne({ sessionId });
};
