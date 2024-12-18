import { Request, Response } from "express";
import * as queries from "../../database/queries"
import { Verb } from "../../models/api-models";
//import { oggetto } from "../database/prova-import"

export default async function listVerbs(req: Request, resp: Response) {
  console.log("listVerbs");

  const verbs: Verb[] | undefined = await queries.allVerbs();

  resp.json({
    code: 0,
    message: "OK",
    rows: verbs
  });
}

