const BaseRouter = require("../base/base");
const AuthService = require("./service");
const logger = require("../../_utils/logger");
const CustomResponse = require("../../_middleware/response");
const nextErr = require("../../_middleware/handerError");
const { ErrorHandler } = require("../../_middleware/handling/ErrorHandle");
const { authJWT } = require("../../_middleware/auth");

const {
  authenValidation,
} = require("../../_middleware/request-validator/authentication");
class AuthRouter extends BaseRouter {
  constructor() {
    const authService = new AuthService();
    super(authService);

    this.post("/register", authenValidation.register, this.register);

    this.get("/login",authenValidation.login, this.login);
  }

  register = async (req, res, next) => {
    let user = await this._service.registerService(req);
    if (!user || user instanceof Error) {
      logger.error(user);
      nextErr(new ErrorHandler(404, user.message), req, res, next);
      return;
    }
    CustomResponse.sendObject(res, 200, user);
    res.end();
  };

  login = async (req, res, next) => {
    let user = await this._service.loginService(req);

    if (user instanceof Error ) {
        logger.error(user);
        nextErr(new ErrorHandler(404, user.message), req, res, next);
        return;
    }
    // CustomResponse.sendObject(res, 200, user);
    authJWT(req, res, user);
  };
}

module.exports = AuthRouter;
