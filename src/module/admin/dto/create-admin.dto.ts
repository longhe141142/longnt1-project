import { IsEmail, IsNotEmpty} from 'class-validator';

export class CreateAdminDto {
    @IsNotEmpty()
    userName:string

    @IsEmail()
    email:string

    @IsNotEmpty()
    password:string

   

    // @IsNotEmpty()
    // userName:string

    // @IsNotEmpty()
    // userName:string

    // @IsNotEmpty()
    // userName:string

    // @IsNotEmpty()
    // userName:string


}


export class InitializeRoleForAdmin {

}
