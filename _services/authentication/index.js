const BaseRouter = require("../base/base");
const AuthService = require("./service");
const logger = require("../../_utils/logger");
const CustomResponse = require("../../_middleware/response");
const nextErr = require("../../_middleware/handerError");
const { ErrorHandler } = require("../../_middleware/handling/ErrorHandle");
const { authJWT } = require("../../_middleware/auth");
const { body } = require("express-validator");
const {
  registrationSchema,
  testSchema,
} = require("../../_middleware/request-validator/validator");
const {
  confirmValidation,
  validatorProcess,registerValidation
} = require("../../_middleware/request-validator/index");

class AuthRouter extends BaseRouter {
  constructor() {
    const authService = new AuthService();
    super(authService);
    // this.post(
    //   "/register",
    //   validatorProcess(this._checkSchema, registrationSchema),
    //   confirmValidation(this._validationResult),
    //   this.register
    // );
    this.post(
      "/register",
      registerValidation(testSchema),
      this.register
    );

    // this.get("/login", this.login);
    this.get("/login", this.login);
  }

  register = async (req, res, next) => {
    let user = await this._service.registerService(req);
    if (!user || user instanceof Error) {
      logger.error(user);
      nextErr(new ErrorHandler(404, "Can't register"), req, res, next);
      return;
    }
    CustomResponse.sendObject(res, 200, user);
  };

  login = async (req, res, next) => {
    let user = await this._service.loginService(req);

    if (user instanceof Error || !user) {
      if (user instanceof Error) {
        logger.error(user);
        nextErr(new ErrorHandler(404, "system error"), req, res, next);
        return;
      } else {
        nextErr(
          new ErrorHandler(404, "Invalid userName or password"),
          req,
          res,
          next
        );
      }
      return;
    }
    // CustomResponse.sendObject(res, 200, user);
    authJWT(req, res, user);
  };
}

module.exports = AuthRouter;
