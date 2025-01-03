import { Request, Response } from "express";
import * as queries from "../../database/queries"
import { BEVerb } from "../../models/be-models";
import { ResponseVerbs } from "../../models/fe-models";
import * as VerbsMapper from "../../mappers/verbs-mapper";

export default async function allVerbs(req: Request, resp: Response) {
  console.log("All Verbs");

  const verbs: BEVerb[] = await queries.allVerbs();

  const respVerbs: ResponseVerbs = {
    code: 0,
    message: "OK",
    rows: VerbsMapper.mapToFEVerbs(verbs)
  }

  resp.json(respVerbs);
}

