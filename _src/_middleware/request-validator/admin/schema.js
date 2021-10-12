
const { error } = require("../error.interface");
const joi = require("joi");

promoteUser = joi.object({
  userId: joi.string().required().error(error("userId", "string")),
  roleId: joi
    .number()
    .min(0)
    .max(5)
    .required()
    .error(error("roleId", "number")),
});

createAdmin = joi.object({
  userName: joi.string().required().error(error("userName", "string")),
  password: joi.string().required().error(error("password", "string")),
});

module.exports = { promoteUser,createAdmin };
