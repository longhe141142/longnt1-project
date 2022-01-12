import { IntermediaryModule } from './../intermediary/intermediary.module';
import {forwardRef, Module} from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repostories';
import { EmployeeRepository } from '../employee/repository/employee.repository';
import { UserSubscriber } from './user.subscriber';
import { EmployeeModule } from '../employee/employee.module';
import { RoleRopsitory } from '../role/role.repository';
import { JwtStrategy } from '../../auth/strategy/jwt.strategy';
import {AuthService} from "../auth/auth.service";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {AuthRepository} from "../auth/repository/auth.repository";
import {JWT_MODULE_OPTIONS} from "@nestjs/jwt/dist/jwt.constants";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      EmployeeRepository,
      RoleRopsitory,
        // AuthRepository
    ]),
    EmployeeModule,
    IntermediaryModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserSubscriber,],
  exports: [UserService],
})
export class UserModule {}
