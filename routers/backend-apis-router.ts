
import express, { Express, Request, Response, Router } from "express";
import checkVerbs from '../services/apis/check-verbs-service';
import listVerbs from '../services/apis/list-verbs-service';

const backendRouter: Router = express.Router();

export default backendRouter;

backendRouter.use(express.json());
backendRouter.use(express.urlencoded({extended : true}));

backendRouter.post('/checkverbs', checkVerbs);
backendRouter.get('/listverbs', listVerbs);
