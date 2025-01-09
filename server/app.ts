import terminus from "@godaddy/terminus";
import express, { Express } from "express";
import http, { Server } from "http";
import { getPropNumber } from './commons/configuration-properties';
import * as db from "./database/database";
import backendRouter from "./routers/backend-apis-router";

const app: Express = express();
const PORT: number = getPropNumber('config.server.port', 5000);

db.connect();

app.use("/backend/api/", backendRouter);

const server: Server = http.createServer(app);

const options: terminus.TerminusOptions = {
  signals: [ "SIGTERM", "SIGINT" ],
  onSignal: cleanUpApp
};

terminus.createTerminus(server, options);

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Listen on port ${PORT}`);
});

function cleanUpApp() {
  console.log('Server is starting cleanup');
  return Promise.all([
    db.disconnect
  ]);
}
