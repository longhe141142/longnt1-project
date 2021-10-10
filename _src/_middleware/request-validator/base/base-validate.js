const responseValidate = require("../response.error");
const { payload } = require("../../../_config/validator/payload");

module.exports = class BaseValidate {
  _validateSchema = null;
  _payload = null;
  constructor(validateSchema, payload) {
    this._validateSchema = validateSchema;
    this._payload = payload;
  }

  validateMiddleWare = () => {
    // console.log("==========>",this._payload)
    return async (req, res, next) => {
      const error = this._validateSchema.validate(payload(req)[this._payload], {
        abortEarly: true,
      });
      return responseValidate(error, res, next);
    };
  };
};
