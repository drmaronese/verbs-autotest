import terminus from "@godaddy/terminus";
import express, { Express } from "express";
import http, { Server } from "http";
import { getPropNumber, getPropString } from './commons/configuration-properties';
import * as db from "./database/database";
import backendRouter from "./routers/backend-apis-router";
import logger from "./commons/logger";

const app: Express = express();
const PORT: number = getPropNumber('config.server.port', 5000);

db.connect();

app.use(getPropString('config.backend.api.context.path', '/backend/api/'), backendRouter);

const server: Server = http.createServer(app);

const options: terminus.TerminusOptions = {
  signals: [ "SIGTERM", "SIGINT" ],
  onSignal: cleanUpApp
};

terminus.createTerminus(server, options);

server.listen(PORT, "0.0.0.0", () => {
  logger.info(`Listen on port ${PORT}`);
});

function cleanUpApp() {
  logger.info('Server is starting cleanup');
  return Promise.all([
    db.disconnect
  ]);
}
