const { Joi, joi_with_unknown } = require('../configs/joi-config');

const create_post_schema = joi_with_unknown.object({
  user_id: Joi.number().required().min(0).label("User Id"),
  title: Joi.string().required().label('Title'),
});

module.exports = {
  create_post_schema
}