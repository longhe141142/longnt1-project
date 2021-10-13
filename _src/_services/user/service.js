const BaseService = require("../base/base-services");
const logger = require("../../_utils/logger");
const User = require("../../_models/user");
const Role = require("../../_models/role");
const UserRole = require("../../_models/userRole");
const Employee = require("../../_models/employee");
module.exports = class UserService extends BaseService {
  _model = User;
  _include = [UserRole, Employee];
  constructor() {
    super();
  }

  viewProfile = async (req) => {
    try {
      let user = await User.getDetailById(req.user.data.id, null, false, [
        Employee,
        Role,
      ]);

      return user;
    } catch (error) {
      return new Error(error);
    }
  };

  getOwnEmployee = async (manager) => {
    if (!manager) {
      return false;
    }
    try {
      let result = await manager.getOwnEmployee();
      return result;
    } catch (err) {
      return new Error(err);
    }
  };
  getYourEmployee = async (req) => {
    try {
      //get user record from user login
      let user = await User.getDetailByWhere(
        {
          userName: req.user.data.userName,
        },
        null,
        false,
        [Employee, "OwnEmployee"]
      );
      //of course,user must be manager role
      let manager = user;
      //get employee of this user
      let employees = await this.getOwnEmployee(manager);
      if (employees.length === 0) {
        return new Error("You have no employee,add someone to your team first");
      }
      return employees;
    } catch (error) {
      logger.error(error);
      return error;
    }
  };

  getHighestRole = async (userId) => {
    return await UserRole.findAll({
      where: {
        userId: userId,
      },
    })
      .then((data) => {
        return data.map((val) => {
          return val.roleId;
        });
      })
      .then((roles) => {
        return roles.reduce((acc, curr) => {
          return acc < curr ? acc : curr;
        }, roles[0]);
      });
  };

  canAdd = (employeeRoleId, managerRoleId) => {
    console.log(employeeRoleId, managerRoleId);
    return managerRoleId === 2 &&
      employeeRoleId !== 4 &&
      managerRoleId === 2 &&
      employeeRoleId !== 3
      ? new Error(`can't add this employee because you have not enough permission.You are Director,can add Manager or HR only
    (PERMISSION DENIED)`)
      : managerRoleId === 4 && employeeRoleId !== 5
      ? new Error(`can't add this employee because you have not enough permission.You are Manager,can add Employee only
      (PERMISSION DENIED)`)
      : true;
  };

  getAllEmployeeOnly = async (req) => {
    try {
      let manager = await User.getDetailById(req.user.data.id, null);
      let highestRole = await this.getHighestRole(manager.id);
      // console.log(highestRole)
      //array to store users
      let userList = [];
      //array to store employeeId of for each user provided in array userList
      let employeeList = [];
      //only user is emloyee
      let employees = await User.getAllWithDetail({}, null, false, Role);
      if (highestRole === 4) {
        //find all user whose role is employee
        userList = employees.filter((val) => {
          // console.log(val.roles[0].id);
          //if user have only one role and that roleid = 5,surely that's employee
          return val.roles.length === 1 && val.roles[0].id === 5;
        });
      } else if (highestRole === 2) {
        for (let val of employees) {
          let highestRole = await this.getHighestRole(val.id);
          if (highestRole == 4 || highestRole == 3) userList.push(val);
        }
        // console.log(userList);
      }

      // console.log(userList);
      //push employee(information) of each user
      await Promise.all(
        userList.map(async (user) => {
          let emp = await user.getEmployee();
          employeeList.push(emp);
        })
      );

      //returning employee(information)
      return employeeList;
    } catch (err) {
      logger.error(err);
      return new Error("An error occured!");
    }
  };

  addEmployee = async (req) => {
    try {
      const ManagerData = req.user.data;
      //current user as manager after login
      const { id: managerId } = ManagerData;
      //req.body is a array of employee id
      let { employee } = req.body;
      //push employee to array
      let employeeInfo = await Employee.getDetailById(employee.id, null);
      if (!employeeInfo) {
        return new Error("EMPLOYEE NOT FOUND");
      }
      let userInfo = await User.getDetailById(employeeInfo.userId, null);
      let [employeeRoleId, managerRoleId] = await Promise.all([
        this.getHighestRole(userInfo.id),
        this.getHighestRole(managerId),
      ]);

      let canAdd = this.canAdd(employeeRoleId, managerRoleId);
      if (canAdd instanceof Error) {
        return new Error(canAdd);
      }
      let manager = await User.getDetailById(managerId, null, true);
      await manager.addOwnEmployee(employeeInfo);

      // //after add employee,get employee added
      // let employeeOfManager = await manager.getOwnEmployee();
      // //then return list of employee
      return employeeInfo;
      return true;
    } catch (err) {
      //if st wrong,return error
      logger.error(err);
      return err;
    }
  };

  updateEmployee = async (firstName, lastName, userId, transaction) => {
    let employee = await Employee.getDetailByWhere(
      {
        userId: userId,
      },
      transaction
    );

    if (!firstName) {
      firstName = employee.firstName;
    } else if (!lastName) {
      lastName = employee.lastName;
    }

    await employee.update(
      {
        lastName: lastName,
        firstName: firstName,
        fullName: firstName + " " + lastName,
      },
      {
        transaction: transaction,
      }
    );
  };

  updateProfile = async (req) => {
    let transaction = await User.sequelize.transaction();
    try {
      let { firstName, lastName, ...userData } = req.body;
      if (userData.userName) {
        return new Error(`Can't update userName`);
      }
      if (userData.email) {
        return new Error(`Can't update email`);
      }
      let user = await User.getDetailById(req.user.data.id, transaction);
      await User.updateUser(userData, user, transaction);

      if (req.body.firstName || req.body.lastName) {
        await this.updateEmployee(firstName, lastName, user.id, transaction);
      }
      user = await User.getDetailById(req.user.data.id, transaction, false, [
        Employee,
      ]);

      await transaction.commit();
      logger.info("update successfully");
      return user;
    } catch (error) {
      logger.error(error);
      await transaction.rollback();
      return error;
    }
  };
};
