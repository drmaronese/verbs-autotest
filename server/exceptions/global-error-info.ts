export class ErrorInfo {
  public readonly code: string;
  public readonly description: string;

  constructor(code: string, description: string) {
    this.code = code;
    this.description = description;
  }
}

export function errorInfoOf(code: string, description: string) {
  return new ErrorInfo(code, description);  
}

export default class GlobalErrorInfo {
  public GENERIC_ERROR = errorInfoOf("000", "Generic error");
  public INTERNAL_SERVER_ERROR = errorInfoOf("001", "Internal server error");
  public DATABASE_ERROR = errorInfoOf("002", "Database error");
}





