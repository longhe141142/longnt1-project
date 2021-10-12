const User = require("../../_models/user");
const dataUtils = require("../../_utils/index");

let checkWhiteSpace = (filedName) => {
  return (value, helper) => {
    if (dataUtils.whiteSpaceChecker(value)) {
      return helper.message(` ${filedName} not allow whitespace`);
    }
    return value;
  };
};

let checkPhoneNumber = () => {
  return (value, helper) => {
    if (dataUtils.phoneChecker(value)) {
      return value;
    }
    return helper.message("Invalid phone number");
  };
};

let checkIdentity = () => {
  return (value, helper) => {
    if (dataUtils.identityNumberChecker(value)) {
      return value;
    }
    return helper.message("Invalid identity number");
  };
};

let checkSocialInsurance = () => {
  return (value, helper) => {
    if (dataUtils.socialInsuranceChecker(value)) {
      return value;
    }
    return helper.message("Invalid social insurance number");
  };
};

let alphaCharacterOnly = (filedName) => {
  return (value, helper) => {
    if (dataUtils.isAlphaOnly(value)) {
      return value;
    }
    return helper.message(`${filedName} must contain character only`);
  };
};

let isZeroOrOne = (filedName) => {
  return (value, helper) => {
    if (dataUtils.isZeroOrOne(value)) {
      return value;
    }
    return helper.message(`${filedName} must be 0 or 1`);
  };
};

let isValidDAte = (filedName)=>{
  return (value, helper) => {
    if (dataUtils.isValidDAte(value)) {
      return value;
    }
    return helper.message(`${filedName} must follow YYYY-MM-DD format`);
  };
}
module.exports = {
  alphaCharacterOnly,
  checkWhiteSpace,
  checkPhoneNumber,
  checkIdentity,
  checkSocialInsurance,
  isZeroOrOne,
  isValidDAte
};
