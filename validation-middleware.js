const validateAndRespond = (res, schema, data) => {
  const { error } = schema.validate(data);
  const errors = {};

  if (error) {
    error.details.forEach((detail) => {
      errors[detail.context.key] = detail.message.replace(/"/g, '');
    });
    throw new CustomError({message: JSON.stringify(errors), statusCode: 400, isJson: true})
  }
};

const validateRequestParam = (schema) => (req, res, next) => {
  validateAndRespond(res, schema, req.query);
  return next();
}
const validateRequestBody = (schema) => (req, res, next) => {
  validateAndRespond(res, schema, req.body);
  return next();
}

export {
  validateRequestParam,
  validateRequestBody
};