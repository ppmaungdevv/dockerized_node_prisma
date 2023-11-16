const express = require('express')
require('express-async-errors')
const CustomError = require('./configs/custom-error')
global.CustomError = CustomError
const logger = require('./configs/wintson-logger')
const helpers = require('./helpers')
global.Helpers = helpers

const app = express()
const port = 3000

app.use(express.json())

// import routes
require("./routes/routes")(app)

// error handling by listening on uncaughtException event
process.on("uncaughtException", (ex) => {
  logger.error(ex.message, ex);
});

// error handling by listening on unhandledRejection event
process.on("unhandledRejection", (ex) => {
  logger.error(ex.message, ex);
});

// import error handler
app.use(require('./configs/error-handler'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})