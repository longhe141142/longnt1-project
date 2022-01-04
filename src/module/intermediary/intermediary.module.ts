import { Module } from '@nestjs/common';
import { IntermediaryService } from './intermediary.service';
import { IntermediaryController } from './intermediary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermissionRepository } from './repository/role-permission.repository';
import { UserRoleRepository } from './repository/user-role.repository';
import { UserRoleSubscriber } from './subscriber';
@Module({
  imports: [
    TypeOrmModule.forFeature([RolePermissionRepository, UserRoleRepository]),
  ],
  controllers: [IntermediaryController],
  providers: [IntermediaryService, UserRoleRepository, UserRoleSubscriber],
  exports: [UserRoleRepository, IntermediaryService],
})
export class IntermediaryModule {}
