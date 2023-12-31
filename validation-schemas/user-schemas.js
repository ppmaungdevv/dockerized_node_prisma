import { Joi, joi_with_unknown } from '../configs/joi-config.js';
import { subYears } from 'date-fns';

const getMinBirthDate = () => subYears(new Date(), 12);

const create_user_schema = joi_with_unknown.object({
  name: Joi.string().required().label('Name'),
  email: Joi.string().email().required().label('Email'),
  birthday: Joi.date().iso().max('now').less(getMinBirthDate()).required().label('Birthday').messages({
    'date.base': 'Birthday must be a valid date in YYYY-MM-DD format',
    'date.format': 'Birthday must be in YYYY-MM-DD format',
    'date.less': 'You must be at least 12 years old', // Custom message for the `less` rule
  })
});

export {
  create_user_schema
}