
import { NextFunction, Request, Response } from "express";
import logger from "../commons/logger";


export default async function (err: Error, req: Request, res: Response, next: NextFunction) {
  logger.error(err);
}