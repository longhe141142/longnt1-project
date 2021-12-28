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
    console.log(this);
    const a = await this.userService.checkUserExist(userName);
    console.log(a, '1997');
    return !(!!a);
  }
}


@Injectable()
@ValidatorConstraint({ async: true })
export class IsEmailAlreadyExistConstraint
  implements Partial<ValidatorConstraintInterface>
{
  constructor(private readonly userService: UserService) {}
  async validate(userName: any, args: ValidationArguments) {
    console.log(this);
    const a = await this.userService.checkUserExist(userName);
    console.log(a, '1997');
    return !(!!a);
  }
}