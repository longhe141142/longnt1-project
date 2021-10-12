const BaseService = require("../base/base-services");
const Role = require("../../_models/role");
const User = require("../../_models/user");
const Employee = require("../../_models/employee");
const UserRole = require("../../_models/userRole");
const logger = require("../../_utils/logger");
module.exports = class AdminService extends BaseService {
  //admin seeders
  createAdmin = async (data) => {
    //data : req
    console.log("entry");

    const { ...user } = data;
    // employee.createdBy = "user.id";
    // employee.updatedBy = "user.id";
    const admin = await User.findOne({
      userName: data.userName,
    });

    if (admin) return new Error("UserName already existed");
    console.log("entry");
    let transaction = await User.sequelize.transaction();
    try {
      //add admin
      let admin = await User.createAdministrator(user, transaction, "admin");
      if (!admin) {
        return false;
      }

      //after add admins then setRole for it

      await UserRole.bulkCreate(
        [
          {
            userId: admin.id,
            roleId: 1,
            createdBy: "admin",
            updatedBy: "admin",
          },
          {
            userId: admin.id,
            roleId: 2,
            createdBy: "admin",
            updatedBy: "admin",
          },
          {
            userId: admin.id,
            roleId: 3,
            createdBy: "admin",
            updatedBy: "admin",
          },
          {
            userId: admin.id,
            roleId: 4,
            createdBy: "admin",
            updatedBy: "admin",
          },
          {
            userId: admin.id,
            roleId: 5,
            createdBy: "admin",
            updatedBy: "admin",
          },
        ],
        { transaction: transaction }
      );

      transaction.commit();
      return admin;
    } catch (err) {
      transaction.rollback();
      return err;
    }
  };

  //req: https request
  promoteUser = async (req) => {
    //get transaction
    let transaction = await Role.sequelize.transaction();
    //get roleId and userId from req.query
    let { roleId, userId } = this.prepareSetRole(req); // (1)

    //start transaction
    try {
      //find user by userId  [userId<---(1)]
      let userRecord = await User.getDetailById(userId, transaction, false, [
        Role,
        UserRole,
        Employee,
      ]);
      if (!userRecord) return new Error("User not existed");
      //find role by roleId [roleId<----(1)]
      let role = await Role.getDetailById(roleId, transaction, true);
      if (!role) return new Error("Role not true");
      //add role to user from override method of User model
      userRecord = await User.addNewRole(
        userRecord,
        role,
        transaction,
        "admin"
      );
      //commit transaction if success

      transaction.commit();
      //get userRecord again

      //return userRecord
      return userRecord;
    } catch (err) {
      transaction.rollback();
      logger.error(err);
      return err;
    }
  };

  getDetail = async (id) => {
    let role = await Role.findOne({
      where: { id: id },
      include: User,
    });
    return role;
  };

  listAll = async (req) => {
    try {
      let pagingOPtion = this.preparePaging(req);
      logger.info(pagingOPtion)
      let users = await User.findAll({
        offset: pagingOPtion.offset,
        limit: pagingOPtion.limit,
        order: [
          // Will escape full_name and validate DESC against a list of valid direction parameters
          [pagingOPtion.orderBy, pagingOPtion.orderType],
        ],
        include:[
          {
            model:Employee,
          },{
            model:Role,
          }
        ]
      });

      return users;
    } catch (error) {
      logger.error(error);
      return error;
    }
  };
};
