const BaseService = require("../base/base-services");
const logger = require("../../_utils/logger");
const User = require("../../_models/user");
const Role = require("../../_models/role");
const Role_permission = require("../../_models/role_permission");
const UserRole = require("../../_models/userRole");
const Employee = require("../../_models/employee");
module.exports = class UserService extends BaseService {
  _model = User;
  _include = [UserRole, Employee];
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
      //of course,user must be manager role
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
      //array to store users
      let userList;
      //array to store employeeId of for each user provided in array userList
      let employeeList = [];
      //only user is emloyee
      let employees = await User.getAllWithDetail({}, null, false, Role);
      //find all user whose role is employee
      userList = employees.filter((val) => {
        // console.log(val.roles[0].id);
        //if user have only one role and that roleid = 5,surely that's employee
        return val.roles.length === 1 && val.roles[0].id === 5;
      });
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
      let employeeList = [];
      const ManagerData = req.user.data;
      //current user as manager after login
      const { id: managerId } = ManagerData;
      //req.body is a array of employee id
      let { employees } = req.body;
      //push employee to array
      employeeList = employees.map((val) => {
        return Employee.findOne({
          where: {
            id: val.id,
          },
        });
      });
      //get manager by id
      let manager = await User.getDetailById(managerId, null, true);
      //await for user add employee
      let [emp] = await Promise.all([
        manager.getOwnEmployee(),
        ...employeeList.map(async (employee) => {
          return manager.addOwnEmployee(await employee);
        }),
      ]);

      //after add employee,get employee added
      let employeeOfManager = await manager.getOwnEmployee();
      //then return list of employee
      return employeeOfManager;
    } catch (err) {
      //if st wrong,return error
      logger.error(err);
      return err;
    }
  };
};
