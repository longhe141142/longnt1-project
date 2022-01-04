import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeRepository } from './repository/employee.repository';
import { EmployeeSubscriber } from './subscriber/subscriber';
import { UserModule } from '../user/user.module';
import { IntermediaryModule } from '../intermediary/intermediary.module';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeRepository]), IntermediaryModule],
  controllers: [EmployeeController],
  providers: [EmployeeService, EmployeeSubscriber],
  exports: [EmployeeService],
})
export class EmployeeModule {}
