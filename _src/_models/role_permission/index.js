const BaseModel = require("../base");
const Api = require("../api");
const Role = require("../role");
module.exports = class Role_permission extends BaseModel {
  static tableName = "role_permission";
  static modelName = "role_permission";
  static include = [
    {
      model: Role,
      as: "role",
    },
    {
      model: Api,
      as: "api",
    },
  ];
  static schema = require("./schema");

  static associate(models) {
    this.belongsTo(models.Role, {
      foreignKey: "roleId",
      targetKey: "id",
    });
    this.belongsTo(models.Api, {
      foreignKey: "apiId",
      targetKey: "id",
    });
  }
};
