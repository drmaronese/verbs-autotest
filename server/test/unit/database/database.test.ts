import mysql from 'mysql2/promise';
import { connect, disconnect, pool } from '../../../database/database'; // Adjust the import according to your file structure
import { getPropBoolean, getPropNumber, getPropString } from '../../../commons/configuration-properties';
import logger from "../../../commons/logger";

jest.mock('mysql2/promise');
jest.mock('../../../commons/configuration-properties');
jest.mock('../../../commons/logger');

describe('Database Connection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a connection pool on connect', () => {
    (getPropString as jest.Mock).mockReturnValueOnce('localhost');
    (getPropNumber as jest.Mock).mockReturnValueOnce(3306);
    (getPropString as jest.Mock).mockReturnValueOnce('test_db');
    (getPropString as jest.Mock).mockReturnValueOnce('user');
    (getPropString as jest.Mock).mockReturnValueOnce('password');
    (getPropBoolean as jest.Mock).mockReturnValueOnce(true);
    
    const mockPool = { end: jest.fn() };
    (mysql.createPool as jest.Mock).mockReturnValue(mockPool);

    const result = connect();

    expect(mysql.createPool).toHaveBeenCalledWith({
      host: 'localhost',
      port: 3306,
      database: 'test_db',
      user: 'user',
      password: 'password',
      waitForConnections: true,
      connectionLimit: undefined,
      maxIdle: undefined,
      idleTimeout: undefined,
      queueLimit: undefined,
      enableKeepAlive: undefined,
      keepAliveInitialDelay: undefined
    });
    expect(logger.info).toHaveBeenCalledWith("Connection pool created");
    expect(result).toBe(mockPool);
  });

  it('should close the connection pool on disconnect', async () => {
    const mockEnd = jest.fn();
    pool.end = mockEnd; // Assign the mock end to the pool

    await disconnect();

    expect(mockEnd).toHaveBeenCalled();
    expect(logger.info).toHaveBeenCalledWith("Connection pool closed");
  });
});