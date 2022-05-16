import { tryCatchCRUD } from "@helpers/tryCatchCRUD";
import { Collection, Db, MongoClient } from "mongodb";
import { withMiddleware } from "./withMiddleware";
import { User } from "@models/User";
import { Session } from "@models/Session";

export type DbRequest = {
  db: Db;
  usersCollection: Collection<User>;
  sessionsCollection: Collection<Session>;
};

const client = new MongoClient(process.env["DB_URL"] || "");

export const connectToDb = withMiddleware<DbRequest>()(
  async (req, res, next) => {
    await tryCatchCRUD(res, async () => {
      await client.connect();
      const db = client.db(process.env["DB_NAME"]);

      req.db = db;
      req.usersCollection = db.collection("Users");
      req.sessionsCollection = db.collection("Sessions");

      next?.();
    });
  }
);
