
import cors from "cors";
import express, { NextFunction, Request, RequestHandler, Response, Router } from "express";
import * as VerbsMapper from "../mappers/fe-verbs-mapper";
import debugLogsHandler from '../middlewares/debug-logs-handler';
import errorHandler from '../middlewares/error-handler';
import { BEResponseAllVerbs, BEResponseCheckVerbs } from "../models/be-models";
import allVerbs from '../services/apis/verbs-all-service';
import checkVerbs from '../services/apis/verbs-check-service';
import quizVerbs from '../services/apis/verbs-quiz-service';

const backendRouter: Router = express.Router();

export default backendRouter;

backendRouter.use(express.json());
backendRouter.use(express.urlencoded({extended : true}));
backendRouter.use(cors());

backendRouter.use(debugLogsHandler.handler);

backendRouter.get('/verbs/all', apiHandlerCatchErrors(allVerbsHandler));
backendRouter.get('/verbs/quiz', apiHandlerCatchErrors(quizVerbsHandler));
backendRouter.post('/verbs/check', apiHandlerCatchErrors(checkVerbsHandler));

backendRouter.use(errorHandler);

function apiHandlerCatchErrors(apiHandler: RequestHandler): RequestHandler {

  return async function (req: Request, resp: Response, next: NextFunction): Promise<void> {
    try {
      await apiHandler(req, resp, next);

      next();

    } catch(error) {
      next(error);
    }
  }
}

async function allVerbsHandler(req: Request, resp: Response) {
  const beAllVerbsResponse: BEResponseAllVerbs = await allVerbs();

  resp.json(VerbsMapper.mapToFEResponseVerbs(beAllVerbsResponse));
}

async function quizVerbsHandler(req: Request, resp: Response) {
  const beCheckVerbsResponse: BEResponseCheckVerbs = await quizVerbs();

  resp.json(VerbsMapper.mapToFEResponseCheckVerbs(beCheckVerbsResponse));
}

async function checkVerbsHandler(req: Request, resp: Response) {
  const beCheckVerbsResponse: BEResponseCheckVerbs = await checkVerbs(req.body.verbs);

  resp.json(VerbsMapper.mapToFEResponseCheckVerbs(beCheckVerbsResponse));
}
