import { TypedRequest } from "@commonTypes/TypedRequest";
import { AuthRequest } from "@middleware/auth";
import { DbRequest } from "@middleware/connecToDb";
import { withMethod } from "@helpers/withMethod";
import { AddTrainFields, addTrainValidate } from "@forms/addTrain";
import pick from "lodash.pick";
import { TrainModel } from "@controllers/train/TrainModel";

export const addTrain = withMethod<TypedRequest<AuthRequest & DbRequest>>(
  async (req, res) => {
    const fields: (keyof AddTrainFields)[] = [
      "participants",
      "trainer",
      "date",
      "info",
    ];

    const trainPayload = pick(req.body, ...fields) as AddTrainFields;

    await addTrainValidate(trainPayload);

    const trainId = await req.trainCollections.insertOne(
      trainPayload as unknown as TrainModel
    );

    return res.json(trainId);
  }
);
