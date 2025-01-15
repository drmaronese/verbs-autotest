import { StatusCodes } from "http-status-codes";
import GlobalErrorInfo, { ErrorInfo } from "./global-error-info";

export class ApplicationError extends Error {
  public readonly error: ErrorInfo;
  public readonly httpStatus: StatusCodes;

  constructor(name: string, message: string, error: ErrorInfo, httpStatus: StatusCodes) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    
    this.name = name;
    this.error = error;
    this.httpStatus = httpStatus;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class InternalServerError extends ApplicationError {
  constructor(message: string, error?: any) {
    const msg = error !== undefined ? message +"\n"+ error.message :  message;
    super("INTERNAL SERVER ERROR", msg, GlobalErrorInfo.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);

    Error.captureStackTrace(this, this.constructor);
  }
}

export class DatabaseError extends ApplicationError {
  constructor(message: string, error: any) {
    const msg = error !== undefined ? message +"\n"+ error.message :  message;
    super("DATABASE ERROR", msg, GlobalErrorInfo.DATABASE_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);

    Error.captureStackTrace(this, this.constructor);
  }
}
