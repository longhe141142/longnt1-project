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

    this.get("/login", authenValidation.login, this.login);
  }

  register = async (req, res, next) => {
    let user = await this._service.registerService(req);
    if (!user || user instanceof Error) {
      logger.error(user.message);
      nextErr(new ErrorHandler(404, user.message), req, res, next);
      return;
    }
    CustomResponse.sendObject(res, 200, user);
    res.end();
  };

  login = async (req, res, next) => {
    let user = await this._service.loginService(req);

    if (user instanceof Error) {
      logger.error(user);
      nextErr(new ErrorHandler(404, user.message), req, res, next);
      return;
    }
    authJWT(req, res, user);
  };
}

module.exports = AuthRouter;
//Api doc:
    /**
     * @swagger
     * /api/register:
     *   post:
     *     tags:
     *       - Fruits
     *     description: Returns a single fruit
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: _id
     *         description: Particular Fruit Object's ID (Automatically assigned by MongoDB)
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: A single fruit
     *       500:
     *         description: Server Error
     */