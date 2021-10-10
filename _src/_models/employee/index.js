const BaseModel = require("../base");
const User = require("../user");
const Role = require("../role");
const UserRole = require("../userRole");

module.exports = class Employee extends BaseModel {
  static tableName = "employee";
  static modelName = "employee";
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
      target: "id",
      as: "user",
    });

    this.belongsTo(models.User, {
      foreignKey: "managerId",
      target: "id",
      as: "manager",
    });
  }


};
