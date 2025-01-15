import { Request, Response } from "express";
import * as VerbsMapper from "../mappers/fe-verbs-mapper";
import { BEResponseAllVerbs, BEResponseCheckVerbs } from "../models/be-models";
import allVerbs from '../services/apis/verbs-all-service';
import checkVerbs from '../services/apis/verbs-check-service';
import quizVerbs from '../services/apis/verbs-quiz-service';

export async function allVerbsController(req: Request, resp: Response) {
  const beAllVerbsResponse: BEResponseAllVerbs = await allVerbs();

  resp.json(VerbsMapper.mapToFEResponseVerbs(beAllVerbsResponse));
}

export async function quizVerbsController(req: Request, resp: Response) {
  const beCheckVerbsResponse: BEResponseCheckVerbs = await quizVerbs();

  resp.json(VerbsMapper.mapToFEResponseCheckVerbs(beCheckVerbsResponse));
}

export async function checkVerbsController(req: Request, resp: Response) {
  const beCheckVerbsResponse: BEResponseCheckVerbs = await checkVerbs(req.body.verbs);

  resp.json(VerbsMapper.mapToFEResponseCheckVerbs(beCheckVerbsResponse));
}
