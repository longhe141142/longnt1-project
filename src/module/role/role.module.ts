import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import {RoleRopsitory} from './role.repository'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RoleRopsitory])],
  controllers: [RoleController],
  providers: [RoleService]
})
export class RoleModule {}
