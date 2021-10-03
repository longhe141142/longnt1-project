const BaseRouter = require("../base/base");
const AuthService = require("./service");
const logger = require("../../_utils/logger");
const CustomResponse = require("../../_middleware/response");
const nextErr = require("../../_middleware/handerError");
const { ErrorHandler } = require("../../_middleware/handling/ErrorHandle");

class AuthRouter extends BaseRouter {
  constructor() {
    const authService = new AuthService();
    super(authService);
    this.post("/register", this.register);
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
      if(user instanceof Error) {
        logger.error(user);
        nextErr(new ErrorHandler(404, "system error"), req, res, next);
       
      }else{
        nextErr(new ErrorHandler(404, "Invalid userName or password"), req, res, next);

      }
      return;
     
    }


    CustomResponse.sendObject(res, 200, user);
  };
}

module.exports = AuthRouter;
