const BaseService = require("../base/base-services");
const logger = require("../../_utils/logger");
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
};
