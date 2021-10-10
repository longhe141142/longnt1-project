const { handleError } = require("./handling/ErrorHandle");

const nextErr = (err, req, res, next) => {
  handleError(err, res);
};
module.exports = nextErr;
