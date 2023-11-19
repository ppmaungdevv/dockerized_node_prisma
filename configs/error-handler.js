/* 
* for handling API error responses
*/
import { logger } from './wintson-logger.js';

export default (err, req, res, next) => {
  console.error(err.stack);
  
  // Check if the error is an instance of the custom error class
  if (err instanceof CustomError) {
    const error_msg = err.isJson ? JSON.parse(err.message) : { error: err.message }
    
    return res.status(err.statusCode).json(error_msg);
  }
  logger.error(err.message, { error: err });
  // Handle other errors
  return res.status(500).json({ error: 'Internal Server Error' });
}