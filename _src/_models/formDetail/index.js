const BaseModel = require("../base");
const logger = require("../../_utils/logger");
const Form = require("../form");
module.exports = class FormDetail extends BaseModel {
  static tableName = "formDetail";
  static modelName = "formDetail";
  static include = [
    {
      model: Form,
      as: "form",
    },
  ];
  static schema = require("./schema");

  static associate(models) {

    this.belongsTo(models.Form, {
      foreignKey: "formId",
      targetKey: "id",
    });
  }
};
