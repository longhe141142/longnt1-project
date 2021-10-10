module.exports = responeValidate = (error, res, next) => {
  return error.error
    ? res.status(406).json({
        message: "oops",
        err: error.error.message,
      })
    : next();
};
