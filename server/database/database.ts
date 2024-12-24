import mysql from 'mysql2/promise';

export var pool: mysql.Pool;

export function connect(): mysql.Pool {
  pool = mysql.createPool({
    host: 'mysql-aiven-verbs-autotest.l.aivencloud.com',
    port: 24737,
    database: 'VerbsAutotest',
    user: 'verbsUser',
    password: 'AVNS_J8afvy6986Uuuj_4H3f',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });

  console.log("Connection pool created");

  return pool;
}

export async function disconnect(): Promise<void> {
  console.log("Connection pool closed");

  return await pool.end();
}
