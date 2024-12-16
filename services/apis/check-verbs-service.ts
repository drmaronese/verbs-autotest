import { Request, Response } from "express";

export default function checkVerbs(req: Request, resp: Response) {
  console.log("checkVerbs");

  resp.json({
    code: 0,
    message: "OK"
  });
}
