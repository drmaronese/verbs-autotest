
import express, { Express, Request, Response, Router } from "express";
import backendRouter from "./routers/backend-router-apis";

const app: Express = express();
const PORT: number = 3000;

app.use("/backend/api/", backendRouter);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Listen on port ${PORT}`);
});
