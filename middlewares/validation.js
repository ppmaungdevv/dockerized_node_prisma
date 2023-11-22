import CustomError from '../configs/custom-error.js'

const validateAndRespond = (res, schema, data) => {
  const { error } = schema.validate(data, { abortEarly: false });
  const errors = {};

  if (error) {
    error.details.forEach((detail) => {
      // check detail.context.key type for array validation as it's return array index as  key
      if (typeof detail.context.key == 'number') {
        errors[detail.context.label] = detail.message.replace(/"/g, '');
      } else {
        errors[detail.context.key] = detail.message.replace(/"/g, '');
      }
    });
    throw new CustomError({message: JSON.stringify(errors), statusCode: 400, isJson: true})
  }
};

const validateRequestQueryParam = (schema) => (req, res, next) => {
  validateAndRespond(res, schema, req.query);
  return next();
}
const validateRequestBody = (schema) => (req, res, next) => {
  validateAndRespond(res, schema, req.body);
  return next();
}

export {
  validateRequestQueryParam,
  validateRequestBody
};