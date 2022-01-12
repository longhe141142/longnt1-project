import {BadRequestException, Injectable} from '@nestjs/common';
import {CreateAdminDto} from './dto/create-admin.dto';
import {UpdateAdminDto} from './dto/update-admin.dto';
import {UserService} from "../user/user.service";
import {BaseService} from "../../common/base";
import {User} from "../../entities/user";
import {UserRepository} from "../user/user.repostories";
import {Role} from "../../entities/role";

@Injectable()
export class AdminService extends BaseService<User> {

    constructor(private readonly userService: UserService,
                private readonly userRepository: UserRepository) {
        super(userRepository);
    }

    create(createAdminDto: CreateAdminDto) {
        return 'This action adds a new admin';
    }

    findAll() {
        return `This action returns all admin`;
    }

    findOne(id: number) {
        return `This action returns a #${id} admin`;
    }

    update(id: number, updateAdminDto: UpdateAdminDto) {
        return `This action updates a #${id} admin`;
    }

    remove(id: number) {
        return `This action removes a #${id} admin`;
    }

    createAdmninV1() {

    }

    async addRoleForUser(roleId, userId) {
        let user = await this.userService.userRepository.getOneById(userId);
        let roleOfUser = await this.getAllRoleOfUser(user.id);
        if(this.isRoleExisted(roleId,roleOfUser)){
            throw new BadRequestException(`User has already had roleId ${roleId}`)
        }
        await this.userService.addRole(user, roleId);
        let where = {
            id: user.id
        }
        user = await this.userService.userRepository.getOneAndRelation(where, ["roles"]);
        return this.buildResponseSucess(user);
    }

    async getAllRoleOfUser(userId): Promise<Role[]> {
        let where = {
            id: userId
        }
        let user = await this.userRepository.getOneAndRelation(where, ["roles"]);
        return user.roles;
    }

     isRoleExisted(roleId, roles: Array<any>): Boolean {
        let roleIds: Array<number> = this.getRoleIdsFromRoleArray(roles);
         console.log(roleId)
        let outcome = (roleIds.some((role) => {
            console.log(role)
            return role===Number(roleId);
        }));

        return outcome;
    }

    getRoleIdsFromRoleArray(roles: Array<Role>): Array<number> {
        return roles.map(role => role.id);
    }
}
