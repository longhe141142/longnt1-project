import { RegValidate, UserReg, commonReg } from '../constants/common.constants';

export class RegValidation {
  static validateWhiteSpace = (input: string) =>
    RegValidate.WHITESPACE_BETWEEN.test(input) ? true : false;
  static deleteWhiteSpace = (input: string) =>
    input.replace(RegValidate.REMOVE_WHITESPACE_REG, ' ').trim();
  static checkPhone = (str: string) => UserReg.phone.test(str);
  static checkSocialInsurance = (str: string) =>
    UserReg.socialInsurance.test(str);
  static checkIdentityNumber = (str: string) =>
    UserReg.identityNumber.test(str);
  static isBlank = (str: string) => commonReg.blankReg.test(str);
}
