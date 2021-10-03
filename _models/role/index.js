const BaseModel = require("../base");
// const UserRole = require("../models/UserRole");
const USerRole = require("../userRole");
const User = require("../user");
const UserRole = require("../userRole");
const Role_permission = require("../role_permission");
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
      foreignKey: "apiId",
      targetKey: "id",
      through: models.Role_permission,
    });
  }

  static async setRoleUser(user, roleId, transaction) {
    let options = {};
    if (transaction) {
      options.transaction = transaction;
    }
    // let roleRecord = this.findOne({
    //   where: {
    //     id: roleId,
    //   },
    // })
    //   .then((role) => {
    //     console.log("role:", role);
    //     return role.addUser(user,{through:  { role: 'manager' }});
    //   })
    //   .catch((err) => err);
    let roleRecord = await this.findOne({
      where: {
        id: roleId,
      },
      transaction: transaction,
    });
    // console.log(roleRecord);

    // console.log(user);
    let userRole = await USerRole.create(
      {
        createdBy: "admin",
        updatedBy: "admin",
      },
      options
    );
    // console.log(userRole.id);
    await roleRecord.addUser(user, {
      ...options,
      through: { userId: user.id },
    });
    console.log("roleRecord", userRole);
    return roleRecord;
  }
};
