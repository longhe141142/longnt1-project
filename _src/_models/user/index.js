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
    this.hasMany(models.Employee, {
      foreignKey: "managerId",
      targetKey: "id",
      as: "OwnEmployee",
    });
  }

  //register
  /*
  input: data: Object (information of user)

  */
  static registerUser = async (
    data,
    transaction,
    skipInclude = true,
    include
  ) => {
    //starting hash password
    const salt = await bcrypt.genSalt(10);
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

  //register admin

  static createAdministrator = async (user, transaction, who) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    let options = {
      returning: true,
    };
    if (who) {
      (user.createdBy = who), (user.updatedBy = who);
    }
    if (transaction) {
      options.transaction = transaction;
    }

    return this.create(user, options);
  };

  //check if password is right
  static verifyPassword = async (user, password) => {
    try {
      let cmp = await bcrypt.compare(password, user.password);
      console.log(cmp);
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
      createdBy: who,//set  createdBy for UserRole
      updatedBy: who,
    };
    if (transaction) {
      options.transaction = transaction;
    }
    //add role for user
    await user.addRole(role, options);
    return this.getDetailById(user.id, transaction, false, [Employee, Role]);
  };

 
};
