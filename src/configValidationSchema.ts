import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  MONGO_USER: Joi.string().required(),
  MONGO_PASS: Joi.string().required(),
});
