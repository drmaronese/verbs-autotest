import { NextFunction, Request, Response } from "express";
import logger from "../commons/logger";

class DebugLogsHandler {

  public responseBody: any;
  private originalJSON: any;
  private originalEnd: any;

  public handler = (req: Request, resp: Response, next: NextFunction) => {

    const customJson = (jsonBody: any) => {
      this.responseBody = jsonBody;
      resp.json = this.originalJSON;

      return resp.json(jsonBody);
    };

    const customEnd = (args: any): any => {
      resp.end = this.originalEnd;

      logger.info(`
ACCESS
------
REQUEST
Address: ${req.originalUrl}
Http-Method: ${req.method}
Headers: ${JSON.stringify(req.headers)}
Payload:
${JSON.stringify(req.body)}
****************************
RESPONSE
Address: ${req.originalUrl}
Http-Method: ${req.method}
Status: ${resp.statusCode}
Headers: ${JSON.stringify(resp.getHeaders())}
Payload:
${JSON.stringify(this.responseBody)}`);

      return resp.end(args);
    }

    this.originalJSON = resp.json;
    this.originalEnd = resp.end;
    resp.json = customJson;
    resp.end = customEnd;

    next();
  }
}

export default new DebugLogsHandler();