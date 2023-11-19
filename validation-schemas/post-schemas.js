// const { Joi, joi_with_unknown } = require('../configs/joi-config');
import { Joi, joi_with_unknown } from '../configs/joi-config.js';

const create_post_schema = joi_with_unknown.object({
  user_id: Joi.number().required().min(0).label("User Id"),
  title: Joi.string().required().label('Title'),
});

export {
  create_post_schema
}