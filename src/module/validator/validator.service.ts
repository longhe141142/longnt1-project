import { IsUserAlreadyExistConstraint } from './ValidatorContrait/constrait.interface';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraintInterface,
} from 'class-validator';

export function ValidateByConstraint(
  validationOptions?: ValidationOptions,
  Constraint?: ValidatorConstraintInterface | Function,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: Constraint,
    });
  };
}
