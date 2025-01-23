import mysql from 'mysql2/promise';
import { getPropBoolean, getPropNumber, getPropString } from '../commons/configuration-properties';
import logger from "../commons/logger";

export var pool: mysql.Pool;

export function connect(): mysql.Pool {
  pool = mysql.createPool({
    host: getPropString('config.database.host'),
    port: getPropNumber('config.database.port'),
    database: getPropString('config.database.name'),
    user: getPropString('config.database.user'),
    password: getPropString('config.database.password'),
    waitForConnections: getPropBoolean('config.database.waitForConnections'),
    connectionLimit: getPropNumber('config.database.connectionLimit'),
    maxIdle: getPropNumber('config.database.maxIdle'),
    idleTimeout: getPropNumber('config.database.idleTimeout'),
    queueLimit: getPropNumber('config.database.queueLimit'),
    enableKeepAlive: getPropBoolean('config.database.enableKeepAlive'),
    keepAliveInitialDelay: getPropNumber('config.database.keepAliveInitialDelay')
  });

  logger.info("Connection pool created");

  return pool;
}

export async function disconnect(): Promise<void> {
  logger.info("Connection pool closed");

  return await pool.end();
}
