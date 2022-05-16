import { Response } from "express";

export const tryCatchCRUD = async (
  res: Response,
  tryCallback?: () => Promise<any>,
  catchCallBack?: () => Promise<any>,
  errText?: string
) => {
  try {
    await tryCallback?.();
  } catch (err) {
    await catchCallBack?.();
    let errMessage = errText;
    if (!errText && err instanceof Error) {
      errMessage = err.message;
    }
    res?.status(400)?.json({ message: errMessage });
  }
};
