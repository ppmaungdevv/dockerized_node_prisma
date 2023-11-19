/* 
* Joi config file to allow additional key
* that are not included in validation schema
*/
// const Joi = require('joi');
import Joi from 'joi';

const joi_with_unknown = Joi.defaults((schema) => schema.options({ allowUnknown: true }));

export {
  Joi,
  joi_with_unknown,
};