const BaseRouter = require("../base/base");
// const ApiService = require("./service");
const AdminService = require("./service");
const logger = require("../../_utils/logger");
const CustomResponse = require("../../_middleware/response");
const nextErr = require("../../_middleware/handerError");
const { ErrorHandler } = require("../../_middleware/handling/ErrorHandle");
// const Role = require("../../_models/role");
// const UserRole = require("../../_models/userRole");
const User = require("../../_models/user");


module.exports = class AdminRouter extends BaseRouter {
  constructor() {
    let adService = new AdminService();
    super(adService);
    this.post("/add", this.createAdmin);
    this.get("/:id", this.getAdminDetail);
    // this.get("/upgrade/test", this.testSetRole);
    this.post("/upgrade", this.upgradeUser);

    // this.patch("/upgrade/:id", this.addPermission);
  }

  createAdmin = async (req, res, next) => {
    
    let log = await this._service.createAdmin(req.body);
    if (!log || log instanceof Error) {
      logger.error(log);
      res.status(400).send("An error occur!");
    } else {
      res.status(200).send("Create successfully");
    }
  };

  // addPermission = async (req, res, next) => {
  //   let user = await this._service.setRoleUser(req.params.id, req);
  //   if (!user || user instanceof Error) {
  //     nextErr(new ErrorHandler(404, "can't set permission!"), req, res, next);
  //     return;
  //   }

  //   CustomResponse.sendObject(res, 200, user);
  // };

  getAdminDetail = async (req, res, next) => {
    let log = await this._service.getDetail(req.params.id);
    if (!log || log instanceof Error) {
      logger.error(log);
      res.end("Error occured!");
      return;
    }

    res.send(log);
  };

  //use this only for testing
  // testSetRole = async (req, res, next) => {
  //   let transaction = await User.sequelize.transaction();
  //   try {
  //     let user = await User.findOne({
  //       where: {
  //         userName: "admindeptrai",
  //       },
  //       transaction: transaction,
  //     });

  //     // let role = await Role.create(
  //     //   {
  //     //     name: "superAdmin",
  //     //     description: "sss",
  //     //     createdBy: "super",
  //     //     updatedBy: "super",
  //     //   },
  //     //   { transaction: transaction }
  //     // );

  //     let role = await Role.findOne({
  //       where: {
  //         name: "superAdmin",
  //       },
  //       transaction: transaction,
  //     });
  //     if(!role &&!role instanceof Error){
  //       role = await Role.create(
  //         {
  //           name: "superAdmin",
  //           description: "sss",
  //           createdBy: "super",
  //           updatedBy: "super",
  //         },
  //         { transaction: transaction }
  //       );
  //     }
  //     // let userRole = await UserRole.create(
  //     //   {
  //     //     createdBy: "admin",
  //     //     updatedBy: "admin",
  //     //   },
  //     //   { transaction: transaction }
  //     // );

  //     // await user.setRoles([role.id,...arr], {
  //     //   transaction: transaction,
  //     // });

  //     await user.addRole(role, {
  //       transaction: transaction,
  //       through: {
  //         createdBy: "admin",
  //         updatedBy: "admin",
  //       },
  //     });

  //     let rel = await user.getRoles({}, { transaction: transaction });
  //     let arr = rel.map((val) => {
  //       return val.id;
  //     });
  //     console.log(arr);

  //     console.log(rel);
  //     res.send(rel);
  //     transaction.commit();
  //   } catch (err) {
  //     console.log(err);
  //     transaction.rollback();
  //   }
  // };

  upgradeUser = async (req, res, next) => {
    //input : request,output: instance of User model or error
    let userRecord = await this._service.promoteUser(req);
    if (!userRecord || userRecord instanceof Error) {
      //oops ,st wrong!
      nextErr(new ErrorHandler(404, "cant set role"), req, res, next);
      logger.error(`userRecord ${userRecord}`);
      return;
    }

    if (userRecord instanceof User) {
      //aww,everything is ok!
      CustomResponse.SendStatus_WithMessage(res, 200, userRecord);
    } else {
      //so weird
      res.send("???");
    }
  };
};
