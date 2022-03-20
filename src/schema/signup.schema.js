const Joi = require("joi");

const signUpSchema = Joi.object({
    firstName: Joi.string()
    .min(3)
    .max(30)
    .required(),
    lastName: Joi.string()
    .min(3)
    .max(30)
    .required(),
    password: Joi.string()
    .min(6)
    .max(16)
    .required(),
    email: Joi.string()
    .email()
    .required()
});
module.exports = signUpSchema;