import GlobalErrorInfo, { ErrorInfo } from "./global-error-info";
import { StatusCodes } from "http-status-codes";

class ApplicationError extends Error {
  public readonly error: ErrorInfo;
  public readonly httpStatus: StatusCodes;

  constructor(message: string, error: ErrorInfo, httpStatus: StatusCodes) {
    super(message);
    this.error = error;
    this.httpStatus = httpStatus;
  }
}

class InternalServerError extends ApplicationError {
  constructor(message: string, error: ErrorInfo, httpStatus: StatusCodes) {
    super(message, GlobalErrorInfo.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}