const Joi = require("joi");

module.exports.user = (req, res) => {
  return Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    age: Joi.number().integer().optional(),
    gender: Joi.string().required().valid("M", "F", "O"),
    checkBoolean: Joi.boolean().required().allow(null, ""),
    mobNo: Joi.string()
      .regex(/^[0-9]{10}$/)
      .required(),
    sports: Joi.array().items(Joi.object()).required(),
    email: Joi.string().email().required(),
    hobbies: Joi.array().items(Joi.string()).required(),
  });
};
