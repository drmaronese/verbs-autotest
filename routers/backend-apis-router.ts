
import express, { Express, Request, Response, Router } from "express";
import allVerbs from '../services/apis/verbs-all-service';
import quizVerbs from '../services/apis/verbs-quiz-service';
import checkVerbs from '../services/apis/verbs-check-service';

const backendRouter: Router = express.Router();

export default backendRouter;

backendRouter.use(express.json());
backendRouter.use(express.urlencoded({extended : true}));

backendRouter.get('/verbs/all', allVerbs);
backendRouter.get('/verbs/quiz/:level', quizVerbs);
backendRouter.post('/verbs/check', checkVerbs);
