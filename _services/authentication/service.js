const BaseService = require("../base/base-services");
const User = require("../../_models/user");
const Role = require("../../_models/role");
const UserRole = require("../../_models/userRole");
const Employee = require("../../_models/employee");
const logger = require("../../_utils/logger");

class AuthService extends BaseService {
  constructor() {
    super();
  }

  // coreService = () => {
  //   return "hello world";
  // };

  registerService = async (req) => {
    const { employee, ...user } = req.body;

    employee.createdBy = user.userName;
    employee.updatedBy = user.userName;

    const transaction = await User.sequelize.transaction();
    try {
      const userData = await User.registerUser(user, transaction, false, [
        Employee,
      ]);
      await Employee.create(
        {
          ...employee,
          userId: userData.id,
        },
        { transaction: transaction }
      );

      await UserRole.addRoles(
        [
          {
            userId: userData.id,
            roleId: 5,
          },
        ],
        transaction
      );


      let rel = await User.getDetailById(userData.id, transaction, false, [
        Employee,
        Role,
        UserRole,
      ]);
      if (!rel) {
        logger.warn("something go wrong,rollback....");
        transaction.rollback();
      } else {
        transaction.commit();
        logger.info("Commited transaction");
      }
      return rel;
    } catch (err) {
      transaction.rollback();

      logger.warn(`[UPDATE-${User.modelName}] - `, err.message);
      return err;
    }
  };
  loginService = async (req) => {
    const { userName, password } = req.body;
    //get user by received userName and password from request
    const user = await User.getOneByWhere(
      {
        userName: userName,
      },
      false,
      [Employee, Role, UserRole]
    );

    //if no useName found return false
    if (!user) {
      return false;
    }

    let isValidPassword = await User.verifyPassword(user, password);

    if (isValidPassword instanceof Error) {
      return new Error(`??`);
    }
    if (!(isValidPassword instanceof Error) && user && isValidPassword) {
      return user;
    } else {
      return false;
    }
  };
}

module.exports = AuthService;
