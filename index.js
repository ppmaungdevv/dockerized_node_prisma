const express = require('express')
require('express-async-errors');
const CustomError = require('./configs/custom-error');
global.CustomError = CustomError;
const logger = require('./configs/logger');

const app = express()
const port = 3000

app.use(express.json())

require("./routes/routes")(app)

process.on("uncaughtException", (ex) => {
  console.log('agsfafsg')
  // console.error(ex)
  logger.error(ex.message, ex);
});

process.on("unhandledRejection", (ex) => {
  console.log('loooowrt')
  // console.error(ex)
  logger.error(ex.message, ex);
});

app.use(require('./configs/error-handler'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})