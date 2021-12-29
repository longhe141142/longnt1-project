import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeRepository } from './repository/employee.repository';
import { EmployeeSubscriber } from './subscriber/subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeRepository])],
  controllers: [EmployeeController],
  providers: [EmployeeService, EmployeeSubscriber],
})
export class EmployeeModule {}
