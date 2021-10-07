const express = require("express");
const Router = express.Router;
const logger = require("../../_utils/logger");
const { body, checkSchema, validationResult } = require("express-validator");

module.exports = class BaseRouter extends Router {
  _service = null;
  //-------------for validate--------------//
  _body = body;
  _checkSchema = checkSchema;
  _validationResult = validationResult;
  //--------------------------------------//
  constructor(service) {
    super();
    if (!service) {
      logger.warn("Service have not been initialized!");
    }
    this._service = service;
  }
};
