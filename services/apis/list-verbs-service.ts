import { Request, Response } from "express";


export default function listVerbs(req: Request, resp: Response) {
  console.log("listVerbs");

  resp.json({
    code: 0,
    message: "OK"
  });
}

