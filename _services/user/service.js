const BaseService = require("../base/base-services");
const logger = require("../../_utils/logger");
const User = require("../../_models/user");
module.exports = class UserService extends BaseService {
  _model = "User";
  _include = ["UserRole", "Employee"];
  constructor() {
    super();
  }

  getModel = () => {
    return `model: ${this._model} 
            include: ${this._include}
    `;
  };

  viewProfile = () => {};

  getOwnEmployee = async (manager) => {
    if(!manager){
        return false;
    }
    try {
      let result = await manager.getOwnEmployee();
      return result;
    } catch (err) {
      return new Error(err);
    }
  };
};
