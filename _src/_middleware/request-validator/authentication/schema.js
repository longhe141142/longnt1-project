const {
  checkWhiteSpace,
  checkPhoneNumber,
  checkIdentity,
  checkSocialInsurance,
  alphaCharacterOnly,
} = require("../helper");
const { error } = require("../error.interface");
const joi = require("joi");

const registerSchema = joi.object({
  userName: joi
    .string()
    .alphanum()
    .min(4)
    .max(25)
    .required()
    .trim(true)
    .messages({
      "string.base": `userNAme should be a type of 'text'`,
      "string.empty": `userNAme cannot be an empty field`,
      "string.min": ` userNAme should have a minimum length of {#limit}`,
      "string.alphanum": `not allow special character or whiteSpace`,
      "any.required": `"userNAme" is a required field`,
    }),

  email: joi
    .string()
    .custom(checkWhiteSpace("email"))
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "vn"] } })
    .message(`invalid email`)
    .required()
    .error(error("email", "string")),

  password: joi
    .string()
    .trim(true)
    .min(8)
    .required()
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


  employee: joi
    .object({
      lastName: joi
        .string()
        .min(3)
        .max(30)
        .required()
        .error(error("lastName", "string"))
        .custom(alphaCharacterOnly("lastName")),
      firstName: joi
        .string()
        .min(3)
        .max(30)
        .required()
        .error(error("firstName", "string")).custom(alphaCharacterOnly("firstName")),
    })
    .required(),

});

const loginSchema = joi.object({
  password: joi
    .string()
    .required()
    .error(error("password", "string"))
    .custom(checkWhiteSpace("password")),

  userName: joi
    .string()
    .required()
    .error(error("userName", "string"))
    .custom(checkWhiteSpace("userName")),
});

module.exports = { registerSchema, loginSchema };
