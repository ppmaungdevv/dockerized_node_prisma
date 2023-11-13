const { Joi, joi_with_unknown } = require('../joi-config');

const create_user_schema = joi_with_unknown.object({
  email: Joi.string().required().label('Email'),
});

module.exports = {
  create_user_schema
}