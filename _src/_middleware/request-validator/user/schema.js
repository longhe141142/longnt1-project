const joi = require("joi");
const {
  checkWhiteSpace,
  checkPhoneNumber,
  checkIdentity,
  checkSocialInsurance,
  alphaCharacterOnly,
} = require("../helper");
const { error } = require("../error.interface");
const addEmployeeSchema = joi.object({
  employee: joi.object({
    id: joi.string().required().error(error("id", "string")),
  }),
});

const updateProfileSchema = joi.object({
  password: joi
    .string()
    .trim(true)
    .min(8)
    .error(error("password", "string"))
    .custom(checkWhiteSpace("password")),

  phone: joi
    .string()
    .custom(checkPhoneNumber())
    .error(error("phone", "string")),

  identityNumber: joi
    .string()
    .custom(checkIdentity())
    .error(error("identityNumber", "string")),
  socialInsurance: joi
    .string()
    .custom(checkSocialInsurance())
    .error(error("socialInsurance", "string")),

  age: joi.number().integer().min(18).max(60).error(error("age", "number")),

  lastName: joi
    .string()
    .min(3)
    .max(30)
    .error(error("lastName", "string"))
    .custom(alphaCharacterOnly("lastName")),
  firstName: joi
    .string()
    .min(3)
    .max(30)
    .error(error("firstName", "string"))
    .custom(alphaCharacterOnly("firstName")),
}).required();

module.exports = {
  addEmployeeSchema,
  updateProfileSchema,
};
