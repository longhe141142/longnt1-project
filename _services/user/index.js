const BaseRouter = require("../base/base");
const UserService = require("../user/service");
const User = require("../../_models/user");
const Employee = require("../../_models/employee");
const CustomResponse = require("../../_middleware/response");
const nextErr = require("../../_middleware/handerError");
const { ErrorHandler } = require("../../_middleware/handling/ErrorHandle");
const logger = require("../../_utils/logger");
const { Authorize, verifyToken } = require("../../_middleware/auth");
const { imageUpload } = require("../../_middleware/multerUpload");

module.exports = class UserRouter extends BaseRouter {
  constructor() {
    const user = new UserService();
    super(user);
    // this.post("/getSimp", this.simpleUserApi);
    this.patch("/uploadAvt", this.uploadAvatar);
    this.post(
      "/addEmployee",
      verifyToken,
      Authorize("/user", "/post", "/api/user/addEmployee"),
      this.addUserToManage
    );
    this.get("/ViewProfile", verifyToken, this.getUserDetail);
    this.get(
      "/viewOwnEmployees",
      verifyToken,
      Authorize("/user", "/get", "/api/user/viewOwnEmployees"),
      this.getEmployeeManage
    );
    this.get(
      "/displayEmployeeList",
      verifyToken,
      Authorize("/user", "/get", "/api/user/displayEmployeeList"),
      this.getEmpList
    );
    this.patch(
      "/uploadAvatar",
      verifyToken,
      imageUpload(User).single("image"),
      this.uploadAvatar
    );
  }

  // simpleUserApi = (req, res) => {
  //   res.send(this._service.getModel());
  // };

  addUserToManage = async (req, res, next) => {
    let employeeOfManager = await this._service.addEmployee(req);
    if (employeeOfManager instanceof Error) {
      nextErr(new ErrorHandler(404, "Cant add employee"), req, res, next);
      return;
    } else {
      CustomResponse.sendObject(res, 200, employeeOfManager);
    }
  };

  //view profile
  getUserDetail = async (req, res, next) => {
    let { userName } = req.user.data;

    let user = await User.getDetailByWhere(
      {
        userName: userName,
      },
      null,
      false,
      [Employee]
    );
    res.send(user);
  };

  //add employee to your team
  getEmployeeManage = async (req, res, next) => {
    //call service & input:request output:array of employee
    let employees = await this._service.getYourEmployee(req);
    if (employees instanceof Error || employees === false) {
      logger.error(employees);
      nextErr(new ErrorHandler(404, "Cant retrieve employees"), req, res, next);
      return;
    }
    CustomResponse.sendObject(res, 200, employees);
  };

  getEmpList = async (req, res, next) => {
    let ret = {};
    //call service & input:null output:array of employee
    let employeeList = await this._service.getAllEmployeeOnly();
    if (employeeList instanceof Error || !employeeList) {
      next(new Error(404, "Cant load site"), req, res, next);
    } else {
      ret["employee-list"] = employeeList;
      CustomResponse.sendObject(res, 201, ret);
    }
  };
  uploadAvatar = async (req, res, next) => {
    const image = req.file;
    let userData = req.user.data;
    let user = await User.getDetailByWhere({
      id: userData.id,
    });
    user.avatar = image.filename;
    await user.save();
  };
};
