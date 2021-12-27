import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  Length,
  Validate,
  registerDecorator,
} from 'class-validator';
export function Equal3(property: string) {
  return function (object, propertyName: string) {
    registerDecorator({
      name: 'isRequired',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      // Not the best way but it works, i'll update the answer later ;)
      options: {
        message: '$property is required',
      },
      validator: {
        validate(value: any) {
          return value === 3;
        },
      },
    });
  };
}
export class CreateUserDto {
  // @IsNotEmpty()
  // @IsEmail()
  // @Validate(UniqueEmailValidator)
  // email: string


  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Equal3('userName')
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  @Length(8, 24)
  password: string;


  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}
