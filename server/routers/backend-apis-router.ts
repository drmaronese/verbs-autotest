
import cors from "cors";
import express, { NextFunction, Request, RequestHandler, Response, Router } from "express";
import { allVerbsController, checkVerbsController, quizVerbsController } from '../controllers/api-controllers';
import apiDebugLogsMiddleware from '../middlewares/api-debug-logs-middleware';
import errorHandlerMiddleware from '../middlewares/error-handler-middleware';

const backendRouter: Router = express.Router();

export default backendRouter;

backendRouter.use(express.json());
backendRouter.use(express.urlencoded({extended : true}));
backendRouter.use(cors());

backendRouter.use(apiDebugLogsMiddleware.handler);

backendRouter.get('/verbs/all', apiControllerCatchErrors(allVerbsController));
backendRouter.get('/verbs/quiz', apiControllerCatchErrors(quizVerbsController));
backendRouter.post('/verbs/check', apiControllerCatchErrors(checkVerbsController));

backendRouter.use(errorHandlerMiddleware);

function apiControllerCatchErrors(apiHandler: RequestHandler): RequestHandler {

  return async function (req: Request, resp: Response, next: NextFunction): Promise<void> {
    try {
      await apiHandler(req, resp, next);

      next();

    } catch(error) {
      next(error);
    }
  }
}

