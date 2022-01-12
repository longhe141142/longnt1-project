import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../entities/role';
import { Connection } from 'typeorm';
import { RolePermission } from '../../entities/rolePermission';
import { Api } from '../../entities/api';
import { User } from '../../entities/user';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private connection: Connection) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const router = this.reflector.getAllAndOverride<any>('router', [
      context.getHandler(),
      context.getClass(),
    ]);
    const auth = this.reflector.getAllAndOverride<any>('auth', [
      context.getHandler(),
      context.getClass(),
    ]);
    let { method, url } = auth;
    const request = context.switchToHttp().getRequest();
    let user: User = request.user;
    let roles: Role[] = user.roles;
    if (this.isAdmin(roles)) {
      return true;
    }
    let api = await this.connection.getRepository(Api).findOne({
      where: {
        url,
        method,
        router,
      },
    });

    let canAccess =await this.checkCanAccess( roles.map((role) => role.id),
        api.id,);
    if(canAccess){
      return true;
    }else{
      throw new UnauthorizedException("Unauthorize for user")
    }
  }

  isAdmin(roles: Array<Role>): Boolean {
    return roles.some((role) => role.id === 1);
  }

  async checkCanAccess(roleIds: Array<number>, apiId: string): Promise<boolean> {
   let arr = await Promise.all(
      roleIds.map((roleId) => {
        let rolePermission = this.connection
          .getRepository(RolePermission)
          .findOne({
            where: {
              roleId,
              apiId,
            },
          });
        return rolePermission
      }),
    );
   return arr.filter(n=>n).length>0;

  }
}