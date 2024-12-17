import { Request, Response } from "express";
import { oggetto } from "../database/prova-import"

export default function listVerbs(req: Request, resp: Response) {
  console.log("listVerbs");

  console.log("Oggetto", oggetto.campo);

  resp.json({
    code: 0,
    message: "OK"
  });
}

