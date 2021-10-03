const BaseModel = require("../base");
const bcrypt = require("bcrypt");
const Employee = require("../employee");
const Role = require("../role");
const Form = require("../form");
module.exports = class User extends BaseModel {
  static tableName = "user";
  static modelName = "user";
  static include = [
    {
      model: Employee,
      as: "employee",
    },
    {
      model: Form,
      as: "form",
    },
    {
      model: Role,
      as: "role",
    },
    {
      model: "userRole",
      as: "userRole",
    },
  ];
  static schema = require("./schema");

  static associate(models) {
    this.hasOne(models.Employee, {
      foreignKey: "userId",
      targetKey: "id",
    });

    this.belongsToMany(models.Role, {
      foreignKey: "userId",
      targetKey: "id",
      through: models.UserRole,
    });

    this.hasMany(models.UserRole, {
      foreignKey: "userId",
      targetKey: "id",
    });
    this.hasMany(models.Form, {
      foreignKey: "userId",
      targetKey: "id",
    });
  }

  //register
  static registerUser = async (
    data,
    transaction,
    skipInclude = true,
    include
  ) => {
    const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(data.password, salt);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    data.password = hashedPassword;
    const options = {
      returning: true,
      transaction: transaction,
    };
    if (!skipInclude && (include || this.include)) {
      options.include = include || this.include;
    }

    data.createdBy = data.userName;
    data.updatedBy = data.userName;

    return this.create(data, options);
  };

  //check if password is right
  static verifyPassword = async (user, password) => {
    try {
      let cmp = await bcrypt.compare(password, user.password);

      console.log(cmp)
      return cmp;
    } catch (error) {
      return error;
    }
  };

  //user : userRecord
  //role: roleRecord
  static addNewRole = async (user, role, transaction, who) => {
    let options = {};
    options.through = {
      createdBy: who,
      updatedBy: who,
    };
    if (transaction) {
      options.transaction = transaction;
    }
    await user.addRole(role, options);
    return this.getDetailById(user.id, transaction, false, [Employee, Role]);
  };
};
