const Joi = require('joi');

const joi_with_unknown = Joi.defaults((schema) => schema.options({ allowUnknown: true }));

module.exports = {
  Joi,
  joi_with_unknown,
};