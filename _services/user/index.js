const BaseRouter = require("../base/base");
const UserService = require("../user/service");
const User = require("../../_models/user");
const Employee = require("../../_models/employee");
const CustomResponse = require("../../_middleware/response");
const nextErr = require("../../_middleware/handerError");
const { ErrorHandler } = require("../../_middleware/handling/ErrorHandle");
const logger = require("../../_utils/logger");
const { Authorize, verifyToken } = require("../../_middleware/auth");

module.exports = class UserRouter extends BaseRouter {
  constructor() {
    const user = new UserService();
    super(user);
    this.post("/getSimp", this.simpleUserApi);
    this.patch("/uploadAvt", this.uploadAvatar);
    this.put("/test", this.addUserToManage);
    this.get("/viewInformation", this.getUserDetail);
    this.get(
      "/viewOwnEmployees",
      verifyToken,
       Authorize("/user", "/get", "view profile"),
      this.getEmployeeManage
    );
  }

  simpleUserApi = (req, res) => {
    res.send(this._service.getModel());
  };

  uploadAvatar = (req, res, next) => {};

  addUserToManage = async (req, res, next) => {
    let user = await User.findOne({
      where: {
        userName: "tpt249",
      },
    });
    let employee = await Employee.findOne({
      where: {
        userId: user.id,
      },
    });

    let user2 = await User.findOne({
      where: {
        userName: "bigherodz54",
      },
    });

    await user2.addOwnEmployee(employee);

    let usr3 = await User.getDetailById(user2.id, null, false, [
      Employee,
      "OwnEmployee",
    ]);
    res.send(usr3);
  };

  getUserDetail = async (req, res, next) => {
    let { userName } = req.body;

    let user = await User.getDetailByWhere(
      {
        userName: userName,
      },
      null,
      false,
      [Employee, "OwnEmployee"]
    );

    res.send(user);
  };

  getEmployeeManage = async (req, res, next) => {
    let user = await User.getDetailByWhere(
      {
        userName: req.user.data.userName,
      },
      null,
      false,
      [Employee, "OwnEmployee"]
    );
    console.log(user);
    let manager =  user;
    let employees = await this._service.getOwnEmployee(manager);
    if (employees instanceof Error|| employees === false)  {
      logger.error(employees);
      nextErr(new ErrorHandler(404, "Cant retrieve employees"), req, res, next);
      return;
    }
    CustomResponse.sendObject(res, 200, employees);
  };
};
