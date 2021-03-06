const BaseModel = require("../base");
// const UserRole = require("../models/UserRole");
const USerRole = require("../userRole");
const User = require("../user");
const UserRole = require("../userRole");
const Role_permission = require("../role_permission");
const Api = require("../api")
module.exports = class Role extends BaseModel {
  
  static tableName = "role";
  static modelName = "role";
  static include = [
    {
      model: User,
      as: "user",
    },
    {
      model: UserRole,
      as: "userRole",
    },
    {
      model: Role_permission,
      as: "role_permission",
    },
    {
      model: Api,
      as:"api"
    }
  ];
  static schema = require("./schema");


  static associate(models) {
    this.hasMany(models.UserRole, {
      foreignKey: "roleId",
      targetKey: "id",
    });

    this.belongsToMany(models.User, {
      foreignKey: "roleId",
      targetKey: "id",
      through: models.UserRole,
    });

    this.hasMany(models.Role_permission, {
      foreignKey: "roleId",
      targetKey: "id",
    });

    this.belongsToMany(models.Api, {
      foreignKey: "roleId",
      targetKey: "id",
      through: models.Role_permission,
      as:"api"
    });
  }

  static async setRoleUser(user, roleId, transaction) {
    let options = {};
    if (transaction) {
      options.transaction = transaction;
    }

    let roleRecord = await this.findOne({
      where: {
        id: roleId,
      },
      transaction: transaction,
    });

    let userRole = await USerRole.create(
      {
        createdBy: "admin",
        updatedBy: "admin",
      },
      options
    );
    await roleRecord.addUser(user, {
      ...options,
      through: { userId: user.id },
    });
    console.log("roleRecord", userRole);
    return roleRecord;
  }
};
