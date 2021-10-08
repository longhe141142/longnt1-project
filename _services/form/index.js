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
    // this.post(
    //   "/createManyForm",this.createManyForm
    // )
  }

  createForm = async (req, res, next) => {
    let result = await this._service.addNewForm2(req);
    if (!result || result instanceof Error) {
      nextErr(new ErrorHandler(404, "Can't add form"), req, res, next);
      return;
    } else {
      CustomResponse.sendObject(res, 200, result);
    }
  };

  createManyForm = async (req, res, next) => {
    let result = await this._service.addManyForm(req, res, next);
    if (!result || result instanceof Error) {
      nextErr(new ErrorHandler(404, "Can't add form"), req, res, next);
      return;
    } else {
      CustomResponse.sendObject(res, 200, result);
    }
  };
};
