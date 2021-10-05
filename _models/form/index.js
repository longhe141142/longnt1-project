const BaseModel = require("../base");
const logger = require("../../_utils/logger");
const User = require("../user");
module.exports = class Form extends BaseModel {
  static tableName = "form";
  static modelName = "form";
  static include = [
    {
      model: User,
      as: "user",
    },
  ];
  static schema = require("./schema");

  static associate(models) {

    this.belongsTo(models.User, {
      foreignKey: "userId",
      targetKey: "id",
    });
  }
};
