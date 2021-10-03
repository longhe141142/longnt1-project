const BaseRouter = require("../base/base");
const UserService = require("../user/service");

module.exports = class UserRouter extends BaseRouter {
  constructor() {
    const user = new UserService();
    super(user);
    this.post("/getSimp", this.simpleUserApi);
  }

  simpleUserApi = (req, res) => {
    res.send(this._service.getModel());
  };
};
