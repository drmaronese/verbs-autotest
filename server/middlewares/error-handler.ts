
import { NextFunction, Request, Response } from "express";
import logger from "../commons/logger";
import { ApplicationError } from "../exceptions/global-exceptions";
import { ResponseResult } from "../models/fe-models";
import http from 'http';
import { StatusCodes } from "http-status-codes";
import GlobalErrorInfo from '../exceptions/global-error-info';

export default async function (err: Error, req: Request, resp: Response, next: NextFunction) {
  logger.error(err);

  let respError: ResponseResult;
  let status: StatusCodes

  if (err instanceof ApplicationError) {
    respError = {
      code: err.error.code,
      message: err.error.description
    }
    status = err.httpStatus;
    
  } else {
    respError = {
      code: GlobalErrorInfo.INTERNAL_SERVER_ERROR.code,
      message: GlobalErrorInfo.INTERNAL_SERVER_ERROR.description
    }
    status = StatusCodes.INTERNAL_SERVER_ERROR;
  }

  resp.status(status).json(respError);
}
