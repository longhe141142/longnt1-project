const BaseRouter = require("../base/base");
const FormService = require("./service");

let { Promise } = require("bluebird");
const User = require("../../_models/user");
const Role = require("../../_models/role");
const Role_permission = require("../../_models/role_permission");
const UserRole = require("../../_models/userRole");
const Employee = require("../../_models/employee");
const FormDetail = require("../../_models/formDetail");
const Form = require("../../_models/form");
const CustomResponse = require("../../_middleware/response");
const nextErr = require("../../_middleware/handerError");
const { ErrorHandler } = require("../../_middleware/handling/ErrorHandle");
const logger = require("../../_utils/logger");
const { Authorize, verifyToken, IsAdmin } = require("../../_middleware/auth");
module.exports = class FormRouter extends BaseRouter {
  constructor() {
    const form = new FormService();
    super(form);
    this.post(
      "/create",
      Authorize("/form", "/post", "/api/form/create"),
      this.createForm
    );
    this.put("/submit", this.submitForm);
    this.patch(
      "/checkDueDate",
      Authorize("/form", "/patch", "/api/form/checkDueDate")
    );
    // this.get(
    //   "/YourEmployeeForm",
    //   Authorize("/form", "/get", "api/form/YourEmployeeForm"),
    //   this.viewEmployeeForm
    // );
    this.patch("/modify/content", this.updateContent);
    this.patch(
      "/modify/comment",
      Authorize("/form", "/patch", "/api/form//modify/comment"),
      this.updateComment
    );
    this.get(
      "/list/intern",
      Authorize("/form", "/get", "/api/form//list/intern"),
      this.viewInterForm
    );
  }

  createForm = async (req, res, next) => {
    let result = await this._service.addNewForm(req);
    if (!result || result instanceof Error) {
      nextErr(new ErrorHandler(404, result.mes), req, res, next);
      return;
    } else {
      CustomResponse.sendObject(res, 200, result);
    }
  };

  submitForm = async (req, res, next) => {
    let submitForm = await this._service.submit(req);
    if (submitForm instanceof Error) {
      return nextErr(new ErrorHandler(404, submitForm.message), req, res, next);
    } else {
      CustomResponse.sendObject(res, 200, submitForm);
    }
  };

  updateContent = async (req, res, next) => {
    let modifiedForm = await this._service.update(req, 0);
    if (modifiedForm instanceof Error) {
      return nextErr(
        new ErrorHandler(404, modifiedForm.message),
        req,
        res,
        next
      );
    }

    CustomResponse.sendObject(res, 200, modifiedForm);
  };

  updateComment = async (req, res, next) => {
    let modifiedForm = await this._service.update(req, 1);
    if (modifiedForm instanceof Error) {
      return nextErr(
        new ErrorHandler(404, modifiedForm.message),
        req,
        res,
        next
      );
    }

    CustomResponse.sendObject(res, 200, modifiedForm);
  };

  viewProved = async (req, res, next) => {
    // let OwnEmployee =
    let userData = req.user.data;
    let manager = await User.findOne({
      where: {
        id: userData.id,
      },
    });

    let ownEmployeeList = await manager.getOwnEmployee();
    console.log(ownEmployeeList);
  };

  viewRejected = async (req, res, next) => {
    // let OwnEmployee =
    let userData = req.user.data;
    let manager = await User.findOne({
      where: {
        id: userData.id,
      },
    });

    let ownEmployeeList = await manager.getOwnEmployee();
    console.log(ownEmployeeList);
  };

  viewInterForm = async (req, res, next) => {
    let employeeForms = await this._service.viewForm(req,1);
    if (employeeForms instanceof Error) {
      return nextErr(
        new ErrorHandler(400, employeeForms.message),
        req,
        res,
        next
      );
    }
    CustomResponse.sendObject(res, 200,employeeForms)
  };

  viewEvaluateForm = async (req, res, next) =>{
    
  }

  checkDueDate = async (req, res, next) => {};
};
