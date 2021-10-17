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
 * /api/form/create:
 *   post:
 *     tags:
 *      - form api
 *     summary: create form for user
 *     description: create form for user
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       content:
 *        application/json:
 *         schema:
 *          type: object
 *          $ref: '#/components/formComponent/addForm/request/data'
 *     responses:
 *       200:
 *         description: return object of form and display formDetail.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/formComponent/addForm/response/success'
 *       404:
 *         description: error if failed in validate middleware
 *         content:
 *            application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/formComponent/addForm/response/code404'
 */


/**
 * @swagger
 * /api/form/submit:
 *   put:
 *     tags:
 *      - form api
 *     summary: submit form of current user
 *     description: submit form of current user
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       content:
 *        application/json:
 *         schema:
 *          type: object
 *          properties: 
 *            id: 
 *             type:string
 *         example: 
 *            id: d0f80600-2cde-11ec-bc3e-db15a81a0069
 *     responses:
 *       200:
 *         description: return object of form submitted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/formComponent/submitForm/response/success'
 *       404:
 *         description: 
 *            error if user try to re-submit,|
 *            error if user have no permission to submit form,|
 *            error if form is not existed
 *         content:
 *            application/json:
 *             schema:
 *               type: object
 *               oneOf:
 *                - $ref: '#/components/formComponent/submitForm/response/code404/submitTwice'
 *                - $ref: '#/components/formComponent/submitForm/response/code404/formNotExist'
 *                - $ref: '#/components/formComponent/submitForm/response/code404/noPermission'
 */

/**
 * @swagger
 * /api/form/modify/content:
 *   patch:
 *     tags:
 *      - form api
 *     summary: modify content off current user's own form
 *     description:
 *           modify content off current user's own form,
 *           which is NOT overDue,status must be NEW and NOT deleted
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       content:
 *        application/json:
 *         schema:
 *          type: object
 *          properties: 
 *            id: 
 *             type:string
 *            content: 
 *              type:string
 *         example: 
 *            id: d0f80600-2cde-11ec-bc3e-db15a81a0069
 *            content: "updated content"
 *     responses:
 *       200:
 *         description: return object of form submitted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/formComponent/modifyContent/response/success'
 *       404:
 *         description: 
 *            error if form is deleted,
 *            error if form is closed,
 *            error if form is not existed
 *         content:
 *            application/json:
 *             schema:
 *               type: object
 *               anyOf:
 *                - $ref: '#/components/formComponent/modifyContent/response/code404/formIsClosedException'
 *                - $ref: '#/components/formComponent/modifyContent/response/code404/isDeletedException'
 *                - $ref: '#/components/formComponent/modifyContent/response/code404/noPermission'
 *                - $ref: '#/components/formComponent/modifyContent/response/code404/formNotExistException'
 */


/**
 * @swagger
 * /api/form/modify/comment:
 *   patch:
 *     tags:
 *      - form api
 *     summary: modify content off current user's own form
 *     description:
 *           modify content off current user's own form,
 *           which is NOT overDue,status must be NEW and NOT deleted
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       content:
 *        application/json:
 *         schema:
 *          type: object
 *          properties: 
 *            id: 
 *             type:string
 *            comment: 
 *              type:string
 *         example: 
 *            id: d0f80600-2cde-11ec-bc3e-db15a81a0069
 *            comment: "updated comment"
 *     responses:
 *       200:
 *         description: return object of form submitted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/formComponent/modifyContent/response/success'
 *       404:
 *         description: 
 *            error if form is deleted,
 *            error if form is closed,
 *            error if form is not existed
 *         content:
 *            application/json:
 *             schema:
 *               type: object
 *               anyOf:
 *                - $ref: '#/components/formComponent/modifyContent/response/code404/formIsClosedException'
 *                - $ref: '#/components/formComponent/modifyContent/response/code404/isDeletedException'
 *                - $ref: '#/components/formComponent/modifyContent/response/code404/noPermission'
 *                - $ref: '#/components/formComponent/modifyContent/response/code404/formNotExistException'
 */

/**
 * @swagger
 * /api/form/list/intern:
 *   get:
 *     tags:
 *      - form api
 *     summary: for manager ,hr or director to view probation form
 *     description:
 *           for manager ,hr or director to view probation form,
 *           with manager,CAN VIEW THEIR EMPLOYEES ONLY,
 *           with director and HR can view all probate form,
 *           only form SUBMITTED is available 
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: return object of form submitted and user who own that form
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/formComponent/viewProbateList/response/success'
 *       400:
 *         description: 
 *            error if no form is submitted,
 *            error if manager have NO employee,
 *         content:
 *            application/json:
 *             schema:
 *               type: object
 *               anyOf:
 *                - $ref: '#/components/formComponent/viewProbateList/response/code400/noFormSubmitted'
 *                - $ref: '#/components/formComponent/viewProbateList/response/code400/noEmployee'
 */