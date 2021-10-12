const BaseValidate = require("../base/base-validate");
const { promoteUser,createAdmin } = require("./schema");

let adminValidation = {
  upgradeUser: new BaseValidate(
    promoteUser,
    "promoteUser"
  ).validateMiddleWare(),
  //   login: new BaseValidate(loginSchema, "login").validateMiddleWare(),
  createAdmin: new BaseValidate(
    createAdmin,
    "createAdmin"
  ).validateMiddleWare(),
};

module.exports = {
  adminValidation,
};
