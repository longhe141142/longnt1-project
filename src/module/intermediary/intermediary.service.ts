import { UserRoleRepository } from './repository/user-role.repository';
import { RolePermissionRepository } from './repository/role-permission.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
UserRoleRepository;
@Injectable()
export class IntermediaryService {
  constructor(
    @InjectRepository(RolePermissionRepository)
    private readonly rolePermissionRepository: RolePermissionRepository,
    @InjectRepository(UserRoleRepository)
    private readonly userRoleRepository: UserRoleRepository,
  ) {}

  initializeRole() {
      
  }
}
