/* 
* winston log cofing file
*/
const winston = require('winston');
const { format } = require('date-fns');

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

module.exports = logger;