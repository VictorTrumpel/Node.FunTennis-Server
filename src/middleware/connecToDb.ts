import { Collection, Db, MongoClient } from "mongodb";
import { UserModel } from "@controllers/user/UserModel";
import { SessionModel } from "@models/SessionModel";
import { TrainModel } from "@controllers/train/TrainModel";
import { withMethod } from "@helpers/withMethod";

export type DbRequest = {
  db: Db;
  usersCollection: Collection<UserModel>;
  sessionsCollection: Collection<SessionModel>;
  trainCollections: Collection<TrainModel>;
};

const client = new MongoClient(process.env["DB_URL"] || "");

export const connectToDb = withMethod<DbRequest>(async (req, _, next) => {
  await client.connect();
  const db = client.db(process.env["DB_NAME"]);

  req.db = db;
  req.usersCollection = db.collection("Users");
  req.sessionsCollection = db.collection("Sessions");
  req.trainCollections = db.collection("Train");

  next?.();
});
