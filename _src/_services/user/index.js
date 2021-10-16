const BaseRouter = require("../base/base");
const UserService = require("../user/service");
const User = require("../../_models/user");
const Employee = require("../../_models/employee");
const CustomResponse = require("../../_middleware/response");
const nextErr = require("../../_middleware/handerError");
const { ErrorHandler } = require("../../_middleware/handling/ErrorHandle");
const { Authorize, verifyToken } = require("../../_middleware/auth");
const { imageUpload } = require("../../_middleware/multerUpload");
const {
  userValidation,
} = require("../../_middleware/request-validator/user/index");

module.exports = class UserRouter extends BaseRouter {
  constructor() {
    const user = new UserService();
    super(user);

    this.patch("/uploadAvt", this.uploadAvatar);
    this.post(
      "/addEmployee",
      verifyToken,
      Authorize(
        this.authorize.user.ROUTER,
        this.authorize.user.addEmployee.METHOD,
        this.authorize.user.addEmployee.URL
      ),
      userValidation.addEmployee,
      this.addUserToManage
    );

    
    this.get(
      "/viewOwnEmployees",
      verifyToken,
      Authorize(
        this.authorize.user.ROUTER,
        this.authorize.user.viewOwnEmployee.METHOD,
        this.authorize.user.viewOwnEmployee.URL
      ),
      this.getEmployeeManage
    );
    this.get(
      "/displayEmployeeList",
      verifyToken,
      Authorize(
        this.authorize.user.ROUTER,
        this.authorize.user.viewAllEmployee.METHOD,
        this.authorize.user.viewAllEmployee.URL
      ),
      this.getEmpList
    );
    this.patch(
      "/uploadAvatar",
      verifyToken,
      imageUpload(User).single("image"),
      this.uploadAvatar
    );

    this.get("/profile", verifyToken, this.viewProfile);
    this.put(
      "/update/profile",
      verifyToken,
      userValidation.updateProfile,
      this.updateProfile
    );
  }


  addUserToManage = async (req, res, next) => {
    let employeeOfManager = await this._service.addEmployee(req);
    if (employeeOfManager instanceof Error) {
      nextErr(
        new ErrorHandler(404, `${employeeOfManager.message}`),
        req,
        res,
        next
      );
      return;
    } else {
      CustomResponse.sendObject(res, 200, employeeOfManager);
    }
  };


  //add employee to your team
  getEmployeeManage = async (req, res, next) => {
    //call service & input:request output:array of employee
    let employees = await this._service.getYourEmployee(req);
    if (employees instanceof Error) {
      nextErr(new ErrorHandler(404, employees.message), req, res, next);
      return;
    }
    CustomResponse.sendObject(res, 200, employees);
  };

  getEmpList = async (req, res, next) => {
    let ret = {};
    //call service & input:null output:array of employee
    let employeeList = await this._service.getAllEmployeeOnly(req);
    if (employeeList instanceof Error || !employeeList) {
      return next(new Error(404, "Cant load site"), req, res, next);
    } else {
      ret["employee-list"] = employeeList;
      CustomResponse.sendObject(res, 201, ret);
    }
  };
  uploadAvatar = async (req, res, next) => {
    try {
      const image = req.file;
      if (!image) {
        return nextErr(
          new ErrorHandler(400, "UPLOAD IMAGE FIRST"),
          req,
          res,
          next
        );
      }
      let userData = req.user.data;
      let user = await User.getDetailByWhere({
        id: userData.id,
      });
      user.avatar = image.filename;
      await user.save();
      CustomResponse.sendObject(res, 200, `success`);
    } catch (error) {
      nextErr(new ErrorHandler(400, error.message), req, res, next);
    }
  };

  viewProfile = async (req, res, next) => {
    const info = await this._service.viewProfile(req);
    if (info instanceof Error) {
      return nextErr(new ErrorHandler(400, info.message), req, res, next);
    }
    CustomResponse.sendObject(res, 200, info);
  };

  updateProfile = async (req, res, next) => {
    const inf4 = await this._service.updateProfile(req);
    if (inf4 instanceof Error) {
      return nextErr(new ErrorHandler(400, inf4.message), req, res, next);
    }
    CustomResponse.sendObject(res, 202, inf4);
  };
};
