import {ValidateByConstraint} from "../../validator/validator.service";
import {isValidRole} from "../../validator/ValidatorContrait/constrait.interface";
import {IsNotEmpty} from "class-validator";


export class AddRoleDto{
    @IsNotEmpty()
    @ValidateByConstraint({
        message: 'RoleId $value is not valid',
    },isValidRole)
    roleId:string
}