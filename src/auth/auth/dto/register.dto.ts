import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { CustomValidation } from './validation/registerValidator';
import { ValidateByConstraint } from '../../../module/validator/validator.service';
import { IsUserAlreadyExistConstraint } from '../../../module/validator/ValidatorContrait/constrait.interface';
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @ValidateByConstraint(
    {
      message: 'User $value already exists. Choose another name.',
    },
    IsUserAlreadyExistConstraint,
  )
  @IsNotEmpty()
  userName!: string;

  @IsBoolean()
  @IsOptional()
  isActive!: Boolean;

  @CustomValidation.checkPhoneNumberFormat('phone')
  @IsOptional()
  phone!: string;

  @IsOptional()
  socialInsurance!: string;

  @IsOptional()
  address!: string;

  @IsOptional()
  identityNumber!: string;
}
