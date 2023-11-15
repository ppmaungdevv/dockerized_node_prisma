const winston = require('winston');
const { format } = require('date-fns');

// Get the current date and time
const currentDate = new Date();

// Format the current date as desired (for example, ISO 8601 format)
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