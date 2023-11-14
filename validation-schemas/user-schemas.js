const { Joi, joi_with_unknown } = require('../joi-config');
const { subYears } = require('date-fns');

const getMinBirthDate = () => subYears(new Date(), 18);

const create_user_schema = joi_with_unknown.object({
  name: Joi.string().required().label('Name'),
  email: Joi.string().email().required().label('Email'),
  birthday: Joi.date().iso().max('now').less(getMinBirthDate()).required().messages({
    'date.less': 'You must be at least 18 years old', // Custom message for the `less` rule
  })
});

module.exports = {
  create_user_schema
}