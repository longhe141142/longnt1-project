const logger = require("../../_utils/logger");
const BaseModel = require("../base");
const User = require("../user");
const Role = require("../role");
module.exports = class UserRole extends BaseModel {
  static tableName = "userRole";
  static modelName = "userRole";
  static include = [
    {
      model: User,
      as: "user",
    },
    {
      model: Role,
      as: "role",
    },
  ];
  static schema = require("./schema");

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "userId",
      targetKey: "id",
    });
    this.belongsTo(models.Role, {
      foreignKey: "roleId",
      targetKey: "id",
    });
  }

  static addRoles(data, transaction) {
    data.map((val) => {
      val.createdBy = "admin";
      val.updatedBy = "admin";
    });

    const options = {};

    if (transaction) {
      options.transaction = transaction;
    }
    return this.bulkCreate(data, options);
  }
};
