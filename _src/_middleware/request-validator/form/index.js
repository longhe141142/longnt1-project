const BaseValidate = require("../base/base-validate");
const {
  createFormSchema,
  submitFormSchema,
  addComment,
  addContent,
  idRequired
} = require("./schema");

let formValidation = {
  createForm: new BaseValidate(
    createFormSchema,
    "createForm"
  ).validateMiddleWare(),
  submit: new BaseValidate(submitFormSchema, "submitForm").validateMiddleWare(),
  content: new BaseValidate(addContent, "content").validateMiddleWare(),
  comment: new BaseValidate(addComment, "comment").validateMiddleWare(),
  idRequire: new BaseValidate(idRequired, "idRequire").validateMiddleWare(),
};

module.exports = {
  formValidation,
};
