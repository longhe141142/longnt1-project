const logger = require("../_utils/logger");
const express = require("express");
const UserRouter = require("./user/index");
const { auth } = require("../_middleware/auth");
const AuthRouter = require("./authentication/index");
const AdminRouter = require("./admin/index");
const FormRouter = require("./form/index");
const { verifyToken, IsAdmin } = require("../_middleware/auth");
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
    this.AdminRouter = new AdminRouter();
    this.FormRouter = new FormRouter();
  }

  registerService = () => {
    this._router.use("/user", this.user);
    this._router.use("/", this.authRouter);
    this._router.use("/admin", verifyToken, IsAdmin(), this.AdminRouter);
    // this._router.use("/admin", verifyToken, this.AdminRouter);
    this._router.use("/form", verifyToken, this.FormRouter);
  };
};
