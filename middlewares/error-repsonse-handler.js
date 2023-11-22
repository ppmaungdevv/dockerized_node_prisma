/* 
* for handling API error responses
*/
import { logger } from '../configs/wintson-logger.js';
import CustomError from '../configs/custom-error.js'

export const errorResponseMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  const response = {
    status: 'error',
    message: 'Internal Server Error',
    data: null
  }
  // Check if the error is an instance of the custom error class
  if (err instanceof CustomError) {
    response['message'] = err.isJson ? JSON.parse(err.message) : { error: err.message }
    
    return res.status(err.statusCode).json(response);
  }
  logger.error(err.message, { error: err });
  // Handle other errors
  return res.status(500).json(response);
}