// const { Joi, joi_with_unknown } = require('../configs/joi-config');
import { Joi, joi_with_unknown } from '../configs/joi-config.js';

const create_post_schema = joi_with_unknown.object({
  user_id: Joi.number().required().min(0).label('User Id'),
  title: Joi.string().required().label('Title'),
  body: Joi.string().required().label('Body'),
  categories: Joi.array()
  .items(Joi.string().label('categories'))
  .messages({
    'string.base': 'Categories must be an array of strings',
  })
});

export {
  create_post_schema
}