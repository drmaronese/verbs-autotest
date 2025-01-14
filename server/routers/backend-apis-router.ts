
import cors from "cors";
import express, { Request, Response, NextFunction, Router, RequestHandler } from "express";
import allVerbs from '../services/apis/verbs-all-service';
import checkVerbs from '../services/apis/verbs-check-service';
import quizVerbs from '../services/apis/verbs-quiz-service';
import errorHandler from '../middlewares/error-handler';
import debugLogsHandler from '../middlewares/debug-logs-handler';

const backendRouter: Router = express.Router();

export default backendRouter;

backendRouter.use(express.json());
backendRouter.use(express.urlencoded({extended : true}));
backendRouter.use(cors());

backendRouter.use(debugLogsHandler.handler);

backendRouter.get('/verbs/all', apiRouterCatchErrors(allVerbs));
backendRouter.get('/verbs/quiz', apiRouterCatchErrors(quizVerbs));
backendRouter.post('/verbs/check', apiRouterCatchErrors(checkVerbs));

backendRouter.use(errorHandler);

function apiRouterCatchErrors(apiService: RequestHandler): RequestHandler {

  return async function (req: Request, resp: Response, next: NextFunction): Promise<void> {
    try {
      await apiService(req, resp, next);

      next();

    } catch(error) {
      next(error);
    }
  }
}
