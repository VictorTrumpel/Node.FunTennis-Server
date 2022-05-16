import { Request } from "express";

export type TypedRequest<Req extends Record<string, any>> = Request & Req;
