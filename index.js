const express = require('express')
require('express-async-errors');
const CustomError = require('./custom-error');
global.CustomError = CustomError;

const app = express()
const port = 3000

app.use(express.json())

require("./routes/routes")(app)

app.use((err, req, res, next) => {
  console.error(err.stack);

  // Check if the error is an instance of the custom error class
  if (err instanceof CustomError) {
    const error_msg = err.isJson ? JSON.parse(err.message) : { error: err.message }

    return res.status(err.statusCode).json(error_msg);
  }

  // Handle other errors
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})