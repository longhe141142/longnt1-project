import { IsEmail, IsNotEmpty } from 'class-validator';
import {CustomValidation} from './validation/registerValidator'
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
  
  @CustomValidation.checkPhoneNumberFormat('userName')
  userName: string;


}



