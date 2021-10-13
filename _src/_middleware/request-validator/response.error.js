const { ErrorHandler }  = require('../handling/ErrorHandle')
const nextErr = require('../handerError')

module.exports = responeValidate = (error, req,res, next) => {
  return error.error
    ? nextErr(new ErrorHandler(404,error.error),req, res, next)
    : next();
};
