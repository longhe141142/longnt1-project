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
      Authorize(
        this.authorize.form.ROUTER,
        this.authorize.form.createForm.METHOD,
        this.authorize.form.createForm.URL
      ),
      this.createForm
    );
    this.put("/submit", this.submitForm);
    // this.patch(
    //   "/checkDueDate",
    //   Authorize("/form", "/patch", "/api/form/checkDueDate")
    // );
    this.patch("/modify/content", this.updateContent);
    this.patch(
      "/modify/comment",
      Authorize(
        this.authorize.form.ROUTER,
        this.authorize.form.managerComment.METHOD,
        this.authorize.form.managerComment.URL
      ),
      this.updateComment
    );
    this.get(
      "/list/intern",
      Authorize(
        this.authorize.form.ROUTER,
        this.authorize.form.viewIntern.METHOD,
        this.authorize.form.viewIntern.URL
      ),
      this.viewInterForm
    );
    this.get(
      "/list/evaluate",
      Authorize(
        this.authorize.form.ROUTER,
        this.authorize.form.viewEvaluate.METHOD,
        this.authorize.form.viewEvaluate.URL
      ),
      this.viewEvaluateForm
    );
    this.get("/list/yours", this.viewYourForm);
    this.put(
      "/approve",
      Authorize(
        this.authorize.form.ROUTER,
        this.authorize.form.approveAction.METHOD,
        this.authorize.form.approveAction.URL
      ),
      this.approve
    );
    this.put(
      "/reject",
      Authorize(
        this.authorize.form.ROUTER,
        this.authorize.form.rejectAction.METHOD,
        this.authorize.form.rejectAction.URL
      ),
      this.reject
    );
    this.patch(
      "/checkDue",
      Authorize(
        this.authorize.form.ROUTER,
        this.authorize.form.checkDue.METHOD,
        this.authorize.form.checkDue.URL
      ),
      this.checkDueDateForm
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

  viewAppProved = async (req, res, next) => {
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
    let employeeForms = await this._service.viewForm(req, 1);
    if (employeeForms instanceof Error) {
      return nextErr(
        new ErrorHandler(400, employeeForms.message),
        req,
        res,
        next
      );
    }
    CustomResponse.sendObject(res, 200, employeeForms);
  };

  viewEvaluateForm = async (req, res, next) => {
    let employeeForms = await this._service.viewForm(req, 2);
    if (employeeForms instanceof Error) {
      return nextErr(
        new ErrorHandler(400, employeeForms.message),
        req,
        res,
        next
      );
    }
    CustomResponse.sendObject(res, 200, employeeForms);
  };

  viewYourForm = async (req, res, next) => {
    let employeeForm = await this._service.viewForm(req, 3);
    if (employeeForm instanceof Error) {
      return nextErr(
        new ErrorHandler(400, employeeForms.message),
        req,
        res,
        next
      );
    }
    CustomResponse.sendObject(res, 200, employeeForm);
  };

  approve = async (req, res, next) => {
    let managerAction = this._service.ManagerAction;
    let approvedForm = await this._service.approveOrReject(
      req,
      managerAction.APPROVE
    );
    if (approvedForm instanceof Error) {
      return nextErr(
        new ErrorHandler(400, approvedForm.message),
        req,
        res,
        next
      );
    }
    CustomResponse.sendObject(res, 200, approvedForm);
  };

  reject = async (req, res, next) => {
    let managerAction = this._service.ManagerAction;
    let approvedForm = await this._service.approveOrReject(
      req,
      managerAction.REJECT
    );
    if (approvedForm instanceof Error) {
      return nextErr(
        new ErrorHandler(400, approvedForm.message),
        req,
        res,
        next
      );
    }
    CustomResponse.sendObject(res, 200, approvedForm);
  };

  checkDueDateForm = async (req, res, next) => {
    await this._service.checkDue(req);
  };
};
