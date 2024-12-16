
import express, { Express, Request, Response } from "express";

const app: Express = express();
const PORT: number = 3000;

app.use(express.json());


export const userRouter = express.Router()

app.get("/", (req: Request, res: Response) => {
  try {
    const body = req.body;
    body.campo = "CAMPO REQUEST"
    const output: string = "{ \"prova\": \"STRINGA\" }";
    console.log("body", body)
    res.json(body);
  } catch (err) {
    console.error(err);
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Listen on port ${PORT}`);
});
