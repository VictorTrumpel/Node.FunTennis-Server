import { CustomMiddleWare, withMiddleware } from "@helpers/withMiddleware";
import { withTryCatchCRUD } from "@helpers/withTryCatchCRUD";

export const withMethod = <
  Req extends Record<string, any> = Record<string, any>,
  Res extends Record<string, any> = Record<string, any>
>(
  method: CustomMiddleWare<Req, Res>
) =>
  withMiddleware<Req, Res>()(async (req, res, next) => {
    await withTryCatchCRUD(res, async () => await method(req, res, next));
  });
