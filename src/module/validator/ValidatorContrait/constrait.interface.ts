import {Injectable} from '@nestjs/common';
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    registerDecorator,
    ValidationOptions,
} from 'class-validator';

import {UserService} from '../../user/user.service';

@Injectable()
@ValidatorConstraint({async: true})
export class IsUserAlreadyExistConstraint
    implements Partial<ValidatorConstraintInterface> {
    constructor(private readonly userService: UserService) {
    }

    async validate(userName: any, args: ValidationArguments) {
        const a = await this.userService.checkUserExist(userName);
        return !(!!a);
    }
}


@ValidatorConstraint({name: 'isEmailAlreadyExist', async: true})
@Injectable()
export class IsEmailAlreadyExistConstraint
    implements Partial<ValidatorConstraintInterface> {
    constructor(private readonly userService: UserService) {
    }

    async validate(email: any, args: ValidationArguments) {
        const a = await this.userService.checkEmailExist(email);
        return !(!!a);
    }
}

@ValidatorConstraint({name: 'isValidRole', async: true})
@Injectable()
export class isValidRole
    implements Partial<ValidatorConstraintInterface> {
    constructor() {
    }

    validate(roleId: any, args: ValidationArguments) {
        roleId = Number(roleId);
        if (roleId > 5 || roleId < 2 || isNaN(roleId)) {
            return false;
        }
        return true;
    }
}