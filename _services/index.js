const logger = require("../_utils/logger");
const express = require("express");
const UserRouter = require("./user/index");
const { auth } = require("../_middleware/auth");
const AuthRouter = require("./authentication/index");
const ApiRouter = require("./api/index");
const AdminRouter = require("./admin/index");
module.exports = class InitialService {
  _service = null;
  _app = null;
  _router = null;

  constructor(app) {
    if (!app) {
      logger.warn("service may not been initialized!");
    }
    this._app = app;
    this._router = express.Router();
    app.use("/api", this._router);
    this.user = new UserRouter();
    this.authRouter = new AuthRouter();
    this.apiRouter = new ApiRouter();
    this.AdminRouter = new AdminRouter();
  }

  registerService = () => {
    // this._router.use("/user", auth, this.user);
    this._router.use("/user", this.user)
    this._router.use("/", this.authRouter);
    this._router.use("/apitest", this.apiRouter);
    this._router.use("/", this.authRouter);
    this._router.use("/admin",this.AdminRouter)
  };
};
