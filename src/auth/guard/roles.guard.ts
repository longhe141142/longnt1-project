import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {Role} from "../../entities/role";
import {ROLES_KEY} from "../../common/decorator";
import {Connection} from "typeorm";
import {RolePermission} from "../../entities/rolePermission";
import {UserRepository} from "../../module/user/user.repostories";
import {Api} from "../../entities/api";
import {User} from "../../entities/user";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private connection: Connection) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const router = this.reflector.getAllAndOverride<any>("router", [
            context.getHandler(),
            context.getClass(),
        ]);
        const auth = this.reflector.getAllAndOverride<any>("auth", [
            context.getHandler(),
            context.getClass(),
        ]);
        let canAccess = false;
        let {method, url} = auth;
        const request = context.switchToHttp().getRequest();
        let user: User = request.user;
        console.log(user)
        let roles:Role[] = user.roles;
        if (this.isAdmin(roles)) {
            return true;
        }
        let api = await this.connection.getRepository(Api).findOne({
            where: {
                url, method, router
            }
        });
        return this.checkCanAccess(roles.map(role=>role.id),api.id);
    }

    isAdmin(roles: Array<Role>): Boolean {
        return roles.some(role => role.id === 1);
    }

     checkCanAccess(roleIds:Array<number>,apiId:string):boolean{
      return roleIds.some( async (roleId)=>{
             return await  this.connection.getRepository(RolePermission).findOne({
                 where: {
                     roleId,
                     apiId
                 }
             })
         })
    }
}