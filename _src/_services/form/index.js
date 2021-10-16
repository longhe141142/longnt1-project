const BaseRouter = require("../base/base");
const FormService = require("./service");
const User = require("../../_models/user");
const CustomResponse = require("../../_middleware/response");
const nextErr = require("../../_middleware/handerError");
const { ErrorHandler } = require("../../_middleware/handling/ErrorHandle");
const { Authorize } = require("../../_middleware/auth");
const { formValidation } = require("../../_middleware/request-validator/form");
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
      formValidation.createForm,
      this.createForm
    );
    this.put("/submit", formValidation.submit, this.submitForm);
    this.patch("/modify/content", formValidation.content, this.updateContent);
    this.patch(
      "/modify/comment",
      Authorize(
        this.authorize.form.ROUTER,
        this.authorize.form.managerComment.METHOD,
        this.authorize.form.managerComment.URL
      ),
      formValidation.comment,
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
      formValidation.idRequire,
      this.approve
    );
    this.put(
      "/reject",
      Authorize(
        this.authorize.form.ROUTER,
        this.authorize.form.rejectAction.METHOD,
        this.authorize.form.rejectAction.URL
      ),
      formValidation.idRequire,
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
    this.put(
      "/close",
      Authorize(
        this.authorize.form.ROUTER,
        this.authorize.form.closeForm.METHOD,
        this.authorize.form.closeForm.URL
      ),
      formValidation.idRequire,
      this.closeForm
    );
  }

  createForm = async (req, res, next) => {
    let result = await this._service.addNewForm(req);
    if (!result || result instanceof Error) {
      nextErr(new ErrorHandler(404, result.message), req, res, next);
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
        new ErrorHandler(400, employeeForm.message),
        req,
        res,
        next
      );
    }
    CustomResponse.sendObject(res, 200, employeeForm);
  };

  checkDueDateForm = async (req, res, next) => {
    let checkDue = await this._service.checkDue();
    if (checkDue instanceof Error) {
      nextErr(new ErrorHandler(400, checkDue.message), req, res, next);
    }
    CustomResponse.sendObject(res, 200, checkDue);
  };

  closeForm = async (req, res, next) => {
    let checkClose = await this._service.closeForm(req);
    if (checkClose instanceof Error) {
      return nextErr(new ErrorHandler(400, checkClose.message), req, res, next);
    }

    CustomResponse.sendObject(res, 200, checkClose);
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
};



/**
 * @swagger
 * /api/user/displayEmployeeList:
 *   get:
 *     tags:
 *      - user api
 *     summary: view all whose role is avalable for current user to add
 *     description: view all whose role is avalable for current user to add(Example-> DIRECTOR can add MANAGER AND HR||MANAGER can add ONLY EMPLOYEE)
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: return array of employee available.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/viewEmployeeList/response/success'
 *       400:
 *         description: error if current user have no permission
 *         content:
 *            application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/viewOwnEmployee/response/code404/unAuthorized'
 */
