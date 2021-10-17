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

    this.post("/login", authenValidation.login, this.login);
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
 *     security:              # <--- ADD THIS
 *      - bearerAuth: []     # <--- ADD THIS
 *     tags:
 *       - Authenticate
 *     description: Returns a single fruit
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A single fruit
 *       500:
 *         description: Server Error
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     tags:
 *      - authentication api
 *     summary: login with user to take access permission
 *     description:
 *           retrieve token to access features
 *     requestBody:
 *       content:
 *        application/json:
 *         schema:
 *          type: object
 *          properties:
 *            userName:
 *              type: string
 *              example: EMPLOYEE7
 *            password:
 *              type: string
 *              example: 12345678
 *     responses:
 *       200:
 *         description: return object of user login success,contain his/her employee information
 *           ,all roles and userRole then tokenize all of the Above
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/AuthComponent/login/response/success'
 *       404:
 *         description:
 *            error if the field is blank, OR
 *            error if wrong user name or password
 *         content:
 *            application/json:
 *             schema:
 *               type: object
 *               oneOf:
 *                - $ref: '#/components/AuthComponent/login/response/code404/incorrectUser'
 *                - $ref: '#/components/AuthComponent/login/response/code404/validationFailed'
 *       
 */

/**
 * @swagger
 * /api/register:
 *   post:
 *     tags:
 *      - authentication api
 *     summary: register provided user information
 *     description:
 *           register provided user information add new user to system with DEFAULT role is EMPLOYEE
 *     requestBody:
 *       content:
 *        application/json:
 *         schema:
 *          type: object
 *          $ref: '#/components/AuthComponent/register/request'
 *     responses:
 *       200:
 *         description: return object of user REGISTER success,contain his/her employee information
 *           ,all roles and userRole
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/AuthComponent/register/response/success'
 *       404:
 *         description:
 *            error if the field is blank, OR
 *            error if wrong user name or password
 *         content:
 *            application/json:
 *             schema:
 *               type: object
 *               oneOf:
 *                - $ref: '#/components/AuthComponent/register/response/code404/userNameExisted'
 *                - $ref: '#/components/AuthComponent/register/response/code404/failedInMiddleware'
 *       
 */