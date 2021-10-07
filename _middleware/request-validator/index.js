const logger = require("../../_utils/logger");
const nextErr = require("../../_middleware/handerError");
const { ErrorHandler } = require("../../_middleware/handling/ErrorHandle");



const registerValidation = (validation) => {
  return async (req, res, next) => {
    const payload = {
      userName: req.body.userName,
      // email: req.body.email,
      // password: req.body.password,
      // mobileNumber: req.body.mobileNumber,
      // birthYear: req.body.birthYear,
      // skillSet: req.body.skillSet,
      // is_active: req.body.is_active,
    };

    const { error } = validation.validate(payload);
    if (error) {
      res.status(406);
      return res.json(
       {
        message:"crashed",
        err:error.message,
       }

      );
    } else {
      next();
    }
  };
};

module.exports = { confirmValidation, validatorProcess ,registerValidation};




// const confirmValidation = (validationResult) => {
//   return async (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       //   return res.status(400).json({
//       //     errors: errors.array(),
//       //   });
//       logger.error("crashed in validator");
//       nextErr(new ErrorHandler(404, errors), req, res, next);
//       return;
//     } else {
//       logger.info("Success validator");
//       next();
//     }
//   };
// };

// const validatorProcess = (checkValidation, validationSchema) => {
//   return checkValidation(validationSchema);
// };