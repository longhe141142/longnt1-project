const BaseService = require("../base/base-services");
const Api = require("../../_models/api");
const Role_permission = require("../../_models/role_permission");
const Role = require("../../_models/role");
module.exports = class ApiService extends BaseService {
  constructor() {
    let model = Api;
    let include = [Role];
    super(model, include);
  }
  
  addAPIs = async (req, res, next) => {
    try {
      let log = await Api.addMany(req.body, null, "admin");
      res.send(log);
    } catch (err) {
      next(err);
    }
  };
};
