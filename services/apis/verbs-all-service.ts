import { Request, Response } from "express";
import * as queries from "../../database/queries"
import { BEVerb } from "../../models/be-models";

export default async function allVerbs(req: Request, resp: Response) {
  console.log("All Verbs");

  const verbs: BEVerb[] | undefined = await queries.allVerbs();

  resp.json({
    code: 0,
    message: "OK",
    rows: verbs
  });
}

