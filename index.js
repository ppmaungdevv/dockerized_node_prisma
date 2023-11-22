import express from 'express'
import 'express-async-errors'
import { successResponseMiddleware } from './middlewares/success-reponse-handler.js'
import { paginateRequest } from './middlewares/pagination.js';
import { logger } from './configs/wintson-logger.js'
import { routes } from './routes/routes.js';
import { errorResponseMiddleware } from './middlewares/error-repsonse-handler.js'

const app = express()
const port = 3000

app.use(express.json())
app.use(paginateRequest) // add take & skip to req for querying with pagination
app.use(successResponseMiddleware)

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
app.use(errorResponseMiddleware)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})