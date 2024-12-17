import mysql from 'mysql2/promise';

class VATDatabase {

  pool!: mysql.Pool;

  connect = (): mysql.Pool => {
    this.pool = mysql.createPool({
      host: 'mysql-aiven-verbs-autotest.l.aivencloud.com',
      port: 24737,
      user: 'verbsUser',
      database: 'AVNS_J8afvy6986Uuuj_4H3f',
      waitForConnections: true,
      connectionLimit: 10,
      maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
      idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    });

    return this.pool;
  };

  disconnect = async (): Promise<void> => {
    return await this.pool.end();
  }
}

const vatDatabase = new VATDatabase();

export default vatDatabase;
