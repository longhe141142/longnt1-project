const BaseValidate = require("../base/base-validate");
const { registerSchema } = require("./schema");

let authenValidation = {
  register: new BaseValidate(registerSchema, "register").validateMiddleWare(),
  login: new BaseValidate(registerSchema, "login").validateMiddleWare()
};

module.exports = {
  authenValidation,
};
