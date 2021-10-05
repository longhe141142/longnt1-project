const BaseService = require("../base/base-services");
const logger = require("../../_utils/logger");
const User = require("../../_models/user");
const Role = require("../../_models/role");
const Role_permission = require("../../_models/role_permission");
const UserRole = require("../../_models/userRole");
const Employee = require("../../_models/employee");
module.exports = class UserService extends BaseService {
  _model = "User";
  _include = ["UserRole", "Employee"];
  constructor() {
    super();
  }

  getModel = () => {
    return `model: ${this._model} 
            include: ${this._include}
    `;
  };

  viewProfile = () => {};

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
      let manager = user;
      //get employee of this user
      let employees = await this.getOwnEmployee(manager);
      return employees;
    } catch (error) {
      logger.error(error);
      return error;
    }
  };
  getAllEmployeeOnly = async () => {
    try {
      //array to store employees
      let userList;
      let employeeList = [];
      //only user is emloyee
      let employees = await User.getAllWithDetail({}, null, false, Role);
      userList = employees.filter((val) => {
        // console.log(val.roles[0].id);
        return val.roles.length === 1 && val.roles[0].id === 5;
      });

      await Promise.all(
        userList.map(async (user) => {
          let emp = await user.getEmployee();
          employeeList.push(emp);
        })
      );

      console.log(employeeList);
      return employeeList;
    } catch (err) {
      logger.error(err);
      return new Error("An error occured!");
    }
  };

  addEmployee = async (req) => {
    try {
      let employeeList = [];
      const ManagerData = req.user.data;
      const { id: managerId } = ManagerData;
      let { employees } = req.body;
      employeeList = employees.map((val) => {
        return Employee.findOne({
          where: {
            id: val.id,
          },
        });
      });
      let manager = await User.getDetailById(managerId, null, true);

      employeeList.map(async (employee) => {
        await manager.addOwnEmployee(await employee);
      });

      let employeeOfManager = await manager.getOwnEmployee();
      return employeeOfManager;
    } catch (err) {
      logger.error(err);
      return err;
    }
  };
};
