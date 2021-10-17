const BaseRouter = require("../base/base");
// const ApiService = require("./service");
const AdminService = require("./service");
const logger = require("../../_utils/logger");
const CustomResponse = require("../../_middleware/response");
const nextErr = require("../../_middleware/handerError");
const { ErrorHandler } = require("../../_middleware/handling/ErrorHandle");
// const Role = require("../../_models/role");
// const UserRole = require("../../_models/userRole");
const {
  adminValidation,
} = require("../../_middleware/request-validator/admin");

module.exports = class AdminRouter extends BaseRouter {
  constructor() {
    let adService = new AdminService();
    super(adService);
    this.post("/add", adminValidation.createAdmin, this.createAdmin);
    this.post("/upgrade", adminValidation.upgradeUser, this.upgradeUser);
    this.get("/list/all/user", this.listAllUser);
    this.get("/list/all/form", this.listAllForm);
    this.get("/view/profile/:id", this.getUserDetail);

    // this.patch("/upgrade/:id", this.addPermission);
  }

  createAdmin = async (req, res, next) => {
    let log = await this._service.createAdmin(req.body);
    if (log instanceof Error) {
      logger.error(log.message);
      res.status(400).send(log.message);
    } else {
      res.status(200).send("Create successfully");
    }
  };

  listAllUser = async (req, res, next) => {
    let users = await this._service.listAllUsr(req);
    if (users instanceof Error) {
      return nextErr(new ErrorHandler(400, users.message), req, res, next);
    }
    CustomResponse.sendObject(res, 200, users);
  };

  upgradeUser = async (req, res, next) => {
    //input : request,output: instance of User model or error
    let userRecord = await this._service.promoteUser(req);
    if (userRecord instanceof Error) {
      //oops ,st wrong!
      nextErr(new ErrorHandler(404, userRecord.message), req, res, next);
      logger.error(`userRecord ${userRecord}`);
      return;
    }

    //aww,everything is ok!
    CustomResponse.SendStatus_WithMessage(res, 200, userRecord);
  };
  listAllForm = async (req, res, next) => {
    let forms = await this._service.listAllForm(req);
    if (forms instanceof Error) {
      return nextErr(new ErrorHandler(400, forms.message), req, res, next);
    }
    CustomResponse.sendObject(res, 200, forms);
  };

  getUserDetail = async (req, res, next) => {
    let profileData = await this._service.getOneUSer(req);
    if (profileData instanceof Error) {
      return nextErr(
        new ErrorHandler(400, profileData.message),
        req,
        res,
        next
      );
    }
    CustomResponse.sendObject(res, 200, profileData);
  };
};

/**
 * @swagger
 * /api/admin/list/all/form:
 *   get:
 *     tags:
 *      - admin api
 *     summary: for admin
 *     description: |
 *           For admin to list all form by paging
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: pageIndex
 *         schema:
 *           type: integer
 *         description: the page number
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *         description: the sorter by field name
 *       - in: query
 *         name: orderType
 *         schema:
 *           oneOf:
 *            - type: string
 *            - type: integer
 *         description: the sorter by type(asc,desc)
 *     responses:
 *       200:
 *         description: all form by paging and order by
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/adminComponent/listAllForm/response/success'
 *       404:
 *         description: |
 *            error if current user have no permission to entry
 *         content:
 *            application/json:
 *             schema:
 *               type: object
 *               anyOf:
 *                - $ref: '#/components/adminComponent/authorizeException'
 */

/**
 * @swagger
 * /api/admin/list/all/user:
 *   get:
 *     tags:
 *      - admin api
 *     summary: for admin only
 *     description: |
 *           For admin to list all user
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: pageIndex
 *         schema:
 *           type: integer
 *         description: The current page index
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *         description: the sorter by field name
 *       - in: query
 *         name: orderType
 *         schema:
 *           oneOf:
 *            - type: string
 *            - type: integer
 *         description: the sorter by type(asc,desc)
 *     responses:
 *       200:
 *         description: all user by paging and order by
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/adminComponent/listAllUser/response/success'
 *       404:
 *         description: |
 *            error if current user have no permission to entry
 *         content:
 *            application/json:
 *             schema:
 *               type: object
 *               anyOf:
 *                - $ref: '#/components/adminComponent/authorizeException'
 */

/**
 * @swagger
 * /api/admin/upgrade:
 *   post:
 *     tags:
 *      - admin api
 *     summary: for admin only
 *     description: |
 *           For admin to promote user to higher role
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: the id of user
 *       - in: query
 *         name: roleId
 *         schema:
 *           type: number
 *         description: roleId
 *     responses:
 *       200:
 *         description: promote user successfully then display all of user data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/adminComponent/promoteUSer/response/success'
 *       404:
 *         description: |
 *            error if current user have no permission to entry
 *         content:
 *            application/json:
 *             schema:
 *               type: object
 *               anyOf:
 *                - $ref: '#/components/adminComponent/authorizeException'
 */

/**
 * @swagger
 * /api/admin/view/profile/{userId}:
 *   get:
 *     tags:
 *      - admin api
 *     summary: for admin only
 *     description: |
 *           For admin to get information of specific user by id
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: the id of user
 *     responses:
 *       200:
 *         description: get user information successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/adminComponent/getUSer/response/success'
 *       404:
 *         description: |
 *            error if current user have no permission to entry
 *         content:
 *            application/json:
 *             schema:
 *               type: object
 *               anyOf:
 *                - $ref: '#/components/adminComponent/authorizeException'
 */

//  *           enum: [asc,desc,descending,ascending,1,-1,ascend,descend]
