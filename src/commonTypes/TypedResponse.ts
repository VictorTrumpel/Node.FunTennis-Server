import { Response } from "express";

export type TypedResponse<Res extends Record<string, any>> = Response & Res;
