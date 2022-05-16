import { NextFunction, Request, Response } from "express";
import { TypedRequest } from "@commonTypes/TypedRequest";
import { TypedResponse } from "@commonTypes/TypedResponse";

type CustomMiddleWare<
  Req extends Record<string, any> = Record<string, any>,
  Res extends Record<string, any> = Record<string, any>
> = (req: Request & Req, res: Response & Res, next: NextFunction) => void;

export const withMiddleware = <
  Req extends Record<string, any> = Record<string, any>,
  Res extends Record<string, any> = Record<string, any>
>() => {
  return (customMiddleWare: CustomMiddleWare<Req, Res>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      const request = req as TypedRequest<Req>;
      const response = res as TypedResponse<Res>;
      await customMiddleWare(request, response, next);
    };
  };
};
