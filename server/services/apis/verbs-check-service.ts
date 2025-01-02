import { Request, Response } from "express";
import * as queries from "../../database/queries"
import { BEVerb } from "../../models/be-models";
import { FEVerb, ResponseVerbs } from "../../models/fe-models";
import { randomNumberRange } from "../../commons/utils"
import * as VerbsMapper from "../../mappers/verbs-mapper";

export default function checkVerbs(req: Request, resp: Response) {
  console.log("Check Verbs");

  console.log(req.body);

  const respVerbs: ResponseVerbs = {
    code: 0,
    message: "OK",
    isVerbsCheck: true,
    rows: []
  }

  resp.json(respVerbs);
}
