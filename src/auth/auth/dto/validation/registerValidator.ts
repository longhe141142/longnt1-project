import { UserService } from './../../../../module/user/user.service';
import { registerDecorator } from 'class-validator';
import { ErrorMessage } from '../../../../common/constants/common.constants';
import { RegValidation } from '../../../../common/untils/reg.validation';
export function Equal3(property: string) {
  return function (object, propertyName: string) {
    registerDecorator({
      name: 'equal 3',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      // Not the best way but it works, i'll update the answer later ;)
      options: {
        message: '$property mustEqual 3',
      },
      validator: {
        validate(value: any) {
          return false;
        },
      },
    });
  };
}

export class CustomValidation {
  constructor(
    private readonly UserService:UserService
  ){}
  static checkPhoneNumberFormat(property: string) {
    return function (object, propertyName: string) {
      registerDecorator({
        name: 'equal 3',
        target: object.constructor,
        propertyName: propertyName,
        constraints: [property],
        // Not the best way but it works, i'll update the answer later ;)
        options: {
          message: ErrorMessage.INVALID_PHONE_NUMBER,
        },
        validator: {
          validate(value: any) {
            //   return RegValidation.checkPhone(p) ;
            console.log(object[propertyName]);
            console.log();
            console.log(propertyName);

            return RegValidation.checkPhone(value);
          },
        },
      });
    };
  }

  static isNotBlankFormat(property: string) {
    return function (object, propertyName: string) {
      registerDecorator({
        name: 'equal 3',
        target: object.constructor,
        propertyName: propertyName,
        constraints: [property],
        options: {
          message: ErrorMessage.INVALID_PHONE_NUMBER,
        },
        validator: {
          validate(value: any) {
            return RegValidation.checkPhone(value);
          },
        },
      });
    };
  }

    checkEmailExist(property:string){
    return  function (object, propertyName: string) {
      registerDecorator({
        name: 'equal 3',
        target: object.constructor,
        propertyName: propertyName,
        constraints: [property],
        options: {
          message: ErrorMessage.EMAIL_EXISTED,
        },
        validator: {
          async validate(value: any) {
            console.log(value);
            // console.log(user)
            return RegValidation.checkPhone(value);
          },
        },
      });
    };
  }
}
