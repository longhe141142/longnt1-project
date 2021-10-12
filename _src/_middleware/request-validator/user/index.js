const BaseValidate = require("../base/base-validate");
const { addEmployeeSchema,updateProfileSchema } = require("./schema");

let userValidation = {
  addEmployee: new BaseValidate(addEmployeeSchema, "addEmployee").validateMiddleWare(),
  updateProfile:new BaseValidate(updateProfileSchema,"updateProfile").validateMiddleWare(),
};

module.exports = {
    userValidation
};
