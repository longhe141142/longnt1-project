import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repostories';
import { EmployeeRepository } from '../employee/repository/employee.repository';
import { UserSubscriber } from './user.subscriber';
import { EmployeeModule } from '../employee/employee.module';
import { EmployeeService } from '../employee/employee.service';


@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]),EmployeeModule],
  controllers: [UserController],
  providers: [UserService, UserSubscriber],
  exports: [UserService],
})
export class UserModule {}
