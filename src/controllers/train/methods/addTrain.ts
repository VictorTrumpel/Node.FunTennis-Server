import { TypedRequest } from "@commonTypes/TypedRequest";
import { AuthRequest } from "@middleware/auth";
import { DbRequest } from "@middleware/connecToDb";
import { withMethod } from "@helpers/withMethod";
import { AddTrainFields, addTrainValidate } from "@forms/addTrain";
import pick from "lodash.pick";

export const addTrain = withMethod<TypedRequest<AuthRequest & DbRequest>>(
  async (req, res) => {
    const fields: (keyof AddTrainFields)[] = ["info"];
    const { info } = pick(req.body, ...fields) as AddTrainFields;

    await addTrainValidate({ ...req.body });

    return res.json({ message: info });
  }
);
