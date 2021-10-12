const { checkWhiteSpace, isZeroOrOne, isValidDAte } = require("../helper");
const { error } = require("../error.interface");
const joi = require("joi");

const createFormSchema = joi.object({
  userId: joi.array().items(joi.string().required().error(error("userId", "string"))),
  type: joi
    .number()
    .required()
    .error(error("type", "number"))
    .custom(isZeroOrOne("type")),
  dueDate: joi
    .string()
    .required()
    .error(error("dueDate", "string"))
    .custom(isValidDAte("dueDate")),
  formDetail: joi.object({
    content: joi.string().error(error("content", "string")),
    managerComment: joi.string().error(error("managerComment", "string"))
  }),
});

const submitFormSchema = joi.object({
  id: joi.string().required().error(error("form id", "string")),
});

const addComment = joi.object({
  comment: joi.string().required().error(error("comment", "string")),
  id: joi.string().required().error(error("form id", "string")),
});

const addContent = joi.object({
  content: joi.string().required().error(error("content", "string")),
  id: joi.string().required().error(error("form id", "string")),
});

const idRequired = joi.object({
  id: joi.string().required().error(error("form id", "string")),
});
module.exports = {
  createFormSchema,
  submitFormSchema,
  addComment,
  addContent,
  idRequired,
};
