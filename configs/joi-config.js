/* 
* Joi config file to allow additional key
* that are not included in validation schema
*/
const Joi = require('joi');

const joi_with_unknown = Joi.defaults((schema) => schema.options({ allowUnknown: true }));

module.exports = {
  Joi,
  joi_with_unknown,
};