import { Request, Response } from "express";
import * as queries from "../../database/queries";
import * as VerbsMapper from "../../mappers/verbs-mapper";
import { BEVerb } from "../../models/be-models";
import { ResponseVerbs } from "../../models/fe-models";

export default async function allVerbs(req: Request, resp: Response) {

  const verbs: BEVerb[] = await queries.allVerbs();

  const respVerbs: ResponseVerbs = {
    code: 0,
    message: "OK",
    rows: VerbsMapper.mapToFEVerbs(verbs)
  }

  resp.json(respVerbs);
}

