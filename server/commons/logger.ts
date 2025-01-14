import winston from 'winston';
import dotenv from 'dotenv';

dotenv.config();

const customLevels = {
  levels: {
    trace: 5,
    debug: 4,
    info: 3,
    warn: 2,
    error: 1,
    fatal: 0,
  },
  colors: {
    trace: 'white',
    debug: 'green',
    info: 'green',
    warn: 'yellow',
    error: 'red',
    fatal: 'red',
  },
};
 
const formatter = winston.format.combine(
  winston.format.errors({ stack: true }),
  winston.format.colorize(),
  winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
  winston.format.splat(),
  winston.format.printf((info) => {
    const { timestamp, level, message, ...meta } = info;
  
    return `${timestamp} [${level}]: ${message} ${meta.errno ? '('+meta.errno+')' : ''} ${meta.stack ? "\n"+meta.stack : ''}`;
    //return `${timestamp} [${level}]: ${meta.stack ? "\n"+meta.stack : message + (meta.errno ? ' ('+meta.errno+')' : '')}`;
  })
);
 
class Logger {
  private logger: winston.Logger;
  
  constructor() {
/*     const prodTransport = new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    });
 */
    const transport = new winston.transports.Console({
      format: formatter,
      handleExceptions: true,
      handleRejections: true
    });
    this.logger = winston.createLogger({
      level: this.isDevEnvironment() ? 'debug' : 'info',
      levels: customLevels.levels,
      transports: [transport],
      exitOnError: false
    });
    winston.addColors(customLevels.colors);
  }

  isDevEnvironment(): boolean {
    return (typeof process.env.APPLICATION_ENVIRONMENT === 'undefined' ||
      process.env.APPLICATION_ENVIRONMENT === null ||
      process.env.APPLICATION_ENVIRONMENT.toUpperCase() === 'DEV');
  }
  
  trace(msg: any, meta?: any) {
    this.logger.log('trace', msg, meta);
  }
  
  debug(msg: any, meta?: any) {
    this.logger.debug(msg, meta);
  }
  
  info(msg: any, meta?: any) {
    this.logger.info(msg, meta);
  }
  
  warn(msg: any, meta?: any) {
    this.logger.warn(msg, meta);
  }
  
  error(msg: any, meta?: any) {
    this.logger.error(msg, meta);
  }
  
  fatal(msg: any, meta?: any) {
    this.logger.log('fatal', msg, meta);
  }
}

export default new Logger();
