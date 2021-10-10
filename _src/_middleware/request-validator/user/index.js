const BaseValidate = require("../base/base-validate");
const { registerSchema, loginSchema } = require("./schema");

let userValidation = {
  register: new BaseValidate(registerSchema, "register").validateMiddleWare(),
  login: new BaseValidate(loginSchema, "login").validateMiddleWare(),
};

module.exports = {
    userValidation,
};
