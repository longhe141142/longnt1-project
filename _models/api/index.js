const BaseModel = require("../base");
const Role_permission = require("../role_permission")
const Role = require("../role");
module.exports = class Api extends BaseModel {
  static tableName = "api";
  static modelName = "api";
  static include = [
    {
      model: Role_permission,
      as: "role_permission",
    },
    {
      model: Role,
      as: "role",
    },
  ];
  static schema = require("./schema");

  static associate(models) {
    this.belongsToMany(models.Role, {
      foreignKey: "roleId",
      targetKey: "id",
      through: models.Role_permission,
    });

    this.hasMany(models.Role_permission, {
      foreignKey: "roleId",
      targetKey: "id",
    });
  }
};
