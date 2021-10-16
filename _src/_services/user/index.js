const BaseRouter = require("../base/base");
const UserService = require("../user/service");
const User = require("../../_models/user");
const Employee = require("../../_models/employee");
const CustomResponse = require("../../_middleware/response");
const nextErr = require("../../_middleware/handerError");
const { ErrorHandler } = require("../../_middleware/handling/ErrorHandle");
const { Authorize, verifyToken } = require("../../_middleware/auth");
const { imageUpload } = require("../../_middleware/multerUpload");
const {
  userValidation,
} = require("../../_middleware/request-validator/user/index");

module.exports = class UserRouter extends BaseRouter {
  constructor() {
    const user = new UserService();
    super(user);

    this.patch("/uploadAvt", this.uploadAvatar);
    this.post(
      "/addEmployee",
      verifyToken,
      Authorize(
        this.authorize.user.ROUTER,
        this.authorize.user.addEmployee.METHOD,
        this.authorize.user.addEmployee.URL
      ),
      userValidation.addEmployee,
      this.addUserToManage
    );

    this.get(
      "/viewOwnEmployees",
      verifyToken,
      Authorize(
        this.authorize.user.ROUTER,
        this.authorize.user.viewOwnEmployee.METHOD,
        this.authorize.user.viewOwnEmployee.URL
      ),
      this.getEmployeeManage
    );
    this.get(
      "/displayEmployeeList",
      verifyToken,
      Authorize(
        this.authorize.user.ROUTER,
        this.authorize.user.viewAllEmployee.METHOD,
        this.authorize.user.viewAllEmployee.URL
      ),
      this.getEmpList
    );
    this.patch(
      "/uploadAvatar",
      verifyToken,
      imageUpload(User).single("image"),
      this.uploadAvatar
    );

    this.get("/profile", verifyToken, this.viewProfile);

    this.put(
      "/update/profile",
      verifyToken,
      userValidation.updateProfile,
      this.updateProfile
    );
  }

  addUserToManage = async (req, res, next) => {
    let employeeOfManager = await this._service.addEmployee(req);
    if (employeeOfManager instanceof Error) {
      nextErr(
        new ErrorHandler(404, `${employeeOfManager.message}`),
        req,
        res,
        next
      );
      return;
    } else {
      CustomResponse.sendObject(res, 200, employeeOfManager);
    }
  };

  //add employee to your team
  getEmployeeManage = async (req, res, next) => {
    //call service & input:request output:array of employee
    let employees = await this._service.getYourEmployee(req);
    if (employees instanceof Error) {
      nextErr(new ErrorHandler(404, employees.message), req, res, next);
      return;
    }
    CustomResponse.sendObject(res, 200, employees);
  };

  getEmpList = async (req, res, next) => {
    let ret = {};
    //call service & input:null output:array of employee
    let employeeList = await this._service.getAllEmployeeOnly(req);
    if (employeeList instanceof Error || !employeeList) {
      return next(new Error(404, "Cant load site"), req, res, next);
    } else {
      ret["employee-list"] = employeeList;
      ret.totalRecord = employeeList.length;
      CustomResponse.sendObject(res, 201, ret);
    }
  };
  uploadAvatar = async (req, res, next) => {
    try {
      const image = req.file;
      if (!image) {
        return nextErr(
          new ErrorHandler(400, "UPLOAD IMAGE FIRST"),
          req,
          res,
          next
        );
      }
      let userData = req.user.data;
      let user = await User.getDetailByWhere({
        id: userData.id,
      });
      user.avatar = image.filename;
      await user.save();
      CustomResponse.sendObject(res, 200, `success`);
    } catch (error) {
      nextErr(new ErrorHandler(400, error.message), req, res, next);
    }
  };

  viewProfile = async (req, res, next) => {
    const info = await this._service.viewProfile(req);
    if (info instanceof Error) {
      return nextErr(new ErrorHandler(400, info.message), req, res, next);
    }
    CustomResponse.sendObject(res, 200, info);
  };

  updateProfile = async (req, res, next) => {
    const inf4 = await this._service.updateProfile(req);
    if (inf4 instanceof Error) {
      return nextErr(new ErrorHandler(400, inf4.message), req, res, next);
    }
    CustomResponse.sendObject(res, 202, inf4);
  };
};

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     tags:
 *      - user api
 *     summary: Retrieve a user profile
 *     description: Retrieve profile of user by the token
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: return a user information,contain roles and employee info.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/ViewProfile/success'
 *       403:
 *         description: No Token provided!
 *         content:
 *            application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/ViewProfile/NoTokenProvided'
 *       400:
 *          description: Invalid token
 *          content:
 *            application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/ViewProfile/invalidToken'
 *
 */

/**
 * @swagger
 * /api/user/addEmployee:
 *   post:
 *     tags:
 *      - user api
 *     summary: add a employee available to your team
 *     description: add a employee available to your team
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: body
 *         schema:
 *          type: object
 *          $ref: '#/components/addEmployee/request/addEmployeeRequest'
 *     responses:
 *       200:
 *         description: return EMPLOYEE information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/addEmployee/response/success'
 *       400:
 *         description: Unauthorized with role doesn't permission
 *         content:
 *            application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/addEmployee/response/unAuthorize'
 *                - $ref: '#/components/ViewProfile/invalidToken'
 *       404:
 *         description:  found employee provided by id
 *         content:
 *            application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/addEmployee/response/notFound'
 *                - $ref: '#/components/addEmployee/response/ValidatorException'
 */

/**
 * @swagger
 * /api/user/uploadAvatar:
 *   patch:
 *     tags:
 *      - user api
 *     summary: add a avatar for current user
 *     description: add a avatar for current user
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       content:
 *        multipart/form-data:
 *         schema:
 *          type: object
 *          properties:
 *           image:
 *             type: string
 *             format: binary
 *     responses:
 *       200:
 *         description: return message success.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/uploadAvatar/response/success'
 *       400:
 *         description: error while send empty body
 *         content:
 *            application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/uploadAvatar/response/code400'
 */

/**
 * @swagger
 * /api/user/update/profile:
 *   put:
 *     tags:
 *      - user api
 *     summary: update profile for current user
 *     description: update profile for current user
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       content:
 *        application/json:
 *         schema:
 *          type: object
 *          $ref: '#/components/updateProfile/request'
 *     responses:
 *       202:
 *         description: return user profile updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/updateProfile/response/success/data'
 *       404:
 *         description: error while send invalid format social insurance
 *         content:
 *            application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/updateProfile/response/code404'
 */


/**
 * @swagger
 * /api/user/viewOwnEmployees:
 *   get:
 *     tags:
 *      - user api
 *     summary: view employee who are in manager(current user) team
 *     description: view employee who are in manager(current user) team
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: return array of employee available.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/viewOwnEmployee/response/success/data'
 *       404:
 *         description: error if current user have no employee
 *         content:
 *            application/json:
 *             schema:
 *               type: object
 *               oneOf:
 *               - $ref: '#/components/viewOwnEmployee/response/code404/noEmployee'
 *               - $ref: '#/components/viewOwnEmployee/response/code404/unAuthorized'
 */

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

