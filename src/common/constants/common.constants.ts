import { customLevel } from '../constants/interface';

export const RegValidate = {
  WHITESPACE_BETWEEN: /^(\w+\s?)*\s*$/,
  REMOVE_WHITESPACE_REG: /\s+/g,
};

export const UserReg = {
  phone: /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{3,4}$/,
  identityNumber: /^\d{9,12}$/,
  socialInsurance: /^\d{5,12}$/,
};

export const commonReg = {
  isValidDAte: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,
  blankReg: /((.\s)|(\s.))+/
};

export const MyCustomLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'grey',
    verbose: 'cyan',
    debug: 'blue',
    silly: 'magenta',
  },
};

export enum ResponseMessage {
  SUCCESS = 'Success',
  CHECK_IN_SUCCESS = 'CHECK_IN_SUCCESS',
  SUCCESS_0 = 'Success',
  SUCCESS_201 = 'Success',
  RESEND_EMAIL_SUCCESS = 'RESEND_EMAIL_SUCCESS',
}

export enum ErrorMessage {
  USER_EXISTED = 'Username already existed',
  INVALID_PHONE_NUMBER = 'invalid phone format',
  EMAIL_EXISTED = 'email is already existed',
  WHITESPACE_NOT_ALLOW = "not allow whitespace",
  INVALID_IDENTITY_NUMBER = "identity number is not valid",
  INVALID_SOCIAL_INSURANCE = "invalid social insurance"
}

export enum CodeName {
  USER_EXISTED = 'USER_EXISTED',
  INVALID_PHONE_NUMBER = 'INVALID_PHONE_NUMBER',
}

export enum ValidationMessage{
  
}



export const bcryptSalt = 9;
