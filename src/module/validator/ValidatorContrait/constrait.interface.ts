import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

import { UserService } from '../../user/user.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsUserAlreadyExistConstraint
  implements Partial<ValidatorConstraintInterface>
{
  constructor(private readonly userService: UserService) {}
  async validate(userName: any, args: ValidationArguments) {
    const a = await this.userService.checkUserExist(userName);
    return !(!!a);
  }
}


@ValidatorConstraint({ name: 'isEmailAlreadyExist', async: true })
@Injectable()
export class IsEmailAlreadyExistConstraint
  implements Partial<ValidatorConstraintInterface>
{
  constructor(private readonly userService: UserService) {}
  async validate(email: any, args: ValidationArguments) {
    const a = await this.userService.checkEmailExist(email);
    return !(!!a);
  }
}