import { Request, Response } from "express";

export default function checkVerbs(req: Request, resp: Response) {
  console.log("Check Verbs");

  resp.json({
    code: 0,
    message: "OK"
  });
}
