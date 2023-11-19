/* 
* winston log cofing file
*/
import winston from 'winston';
import { format } from 'date-fns';

const currentDate = new Date();
const formattedDate = format(currentDate, 'yyyy_MM_dd');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: `logs/error_${formattedDate}.log`, level: 'error' }),
  ]
});

export { logger }