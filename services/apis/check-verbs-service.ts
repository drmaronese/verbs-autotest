import { Request, Response } from "express";
import { oggetto } from "../database/prova-import"

export default function checkVerbs(req: Request, resp: Response) {
  console.log("checkVerbs");

  oggetto.campo = "nuovo valore";

  resp.json({
    code: 0,
    message: "OK"
  });
}
