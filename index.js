import express from 'express'
import 'express-async-errors'
import CustomError from './configs/custom-error.js'
import { logger } from './configs/wintson-logger.js'
import * as helpers from './helpers/index.js'
import { routes } from './routes/routes.js';
import error_handler from './configs/error-handler.js';

global.CustomError = CustomError
global.Helpers = helpers;

const app = express()
const port = 3000

app.use(express.json())

routes(app)

// error handling by listening on uncaughtException event
process.on("uncaughtException", (ex) => {
  console.log('unhandledEx')
  logger.error(ex.message, ex);
});

// error handling by listening on unhandledRejection event
process.on("unhandledRejection", (ex) => {
  console.log('unhandledRejection')
  logger.error(ex.message, ex)
});

// import error handler
app.use(error_handler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})