const BaseRouter = require("../base/base");
const ApiService = require("./service");
module.exports=class ApiRouter extends BaseRouter {
  constructor() {
    let apiService = new ApiService();
    super(apiService);
// console.log(apiService.addAPIs);
    this.post("/add",this._service.addAPIs)
  }
}
