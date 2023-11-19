/* 
* formatting the Error object with custom format
*/
export default class CustomError extends Error {
  constructor({ message = 'Error Occured', statusCode = 500, isJson = false }) {
    super(message);
    this.statusCode = statusCode;
    this.isJson = isJson;
  }
}

// module.exports = CustomError;