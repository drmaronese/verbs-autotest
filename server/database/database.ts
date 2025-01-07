import mysql from 'mysql2/promise';
import { getPropString, getPropNumber, getPropBoolean} from '../commons/configuration-properties'

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

  console.log("Connection pool created");

  return pool;
}

export async function disconnect(): Promise<void> {
  console.log("Connection pool closed");

  return await pool.end();
}
