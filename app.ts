import http, { Server } from "http"
import express, { Express, Request, Response, Router } from "express";
import backendRouter from "./routers/backend-apis-router";
import terminus from "@godaddy/terminus"
import * as db from "./database/database";

const app: Express = express();
const PORT: number = 3000;

db.connect();

app.use("/backend/api/", backendRouter);

const server = http.createServer(app);

const options: terminus.TerminusOptions = {
  signals: [ "SIGTERM", "SIGINT" ],
  onSignal: cleanUpApp
};

terminus.createTerminus(server, options);

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Listen on port ${PORT}`);
});

function cleanUpApp() {
  console.log('server is starting cleanup');
  return Promise.all([
    db.disconnect
  ]);
}

