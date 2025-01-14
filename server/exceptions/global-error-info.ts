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
  public static GENERIC_ERROR = errorInfoOf("VAT-000", "Generic error");
  public static INTERNAL_SERVER_ERROR = errorInfoOf("VAT-001", "Internal server error");
  public static DATABASE_ERROR = errorInfoOf("VAT-002", "Database error");
}



