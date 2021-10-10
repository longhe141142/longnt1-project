const express = require("express");
const Router = express.Router;
const logger = require("../../_utils/logger");
// const { body, checkSchema, validationResult } = require("express-validator");

module.exports = class BaseRouter extends Router {
  _service = null;
  //-------------for validate--------------//
  // _body = body;
  // _checkSchema = checkSchema;
  // _validationResult = validationResult;
  //--------------------------------------//
  constructor(service) {
    super();
    if (!service) {
      logger.warn("Service have not been initialized!");
    }
    this._service = service;
  }

  authorize = {
    form: {
      ROUTER: "/form",
      createForm: {
        URL: "/api/form/create",
        METHOD: "/post",
      },
      managerComment: {
        URL: "/api/form//modify/comment",
        METHOD: "/patch",
      },
      viewIntern: {
        URL: "/api/form/list/intern",
        METHOD: "/get",
      },
      viewEvaluate: {
        URL: "/api/form/list/evaluate",
        METHOD: "/get",
      },
      approveAction: {
        URL: "/api/form/approve",
        METHOD: "/put",
      },
      rejectAction: {
        URL: "/api/form/reject",
        METHOD: "/put",
      },
    },
    user: {},
  };
};
