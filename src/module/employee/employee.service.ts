import { Injectable } from '@nestjs/common';
import { userInformationDto } from '../../auth/auth/dto/index';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeRepository } from '../employee/repository/employee.repository';
import {
  EntityManager,
} from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeRepository)
    private readonly employeeRepository: EmployeeRepository,
  ) {}

  async insertNewEmployee(
    data: userInformationDto,
    createdBy: string,
    transactionEntityManager: EntityManager = null,
  ) {
    return await this.employeeRepository.createEmployee(
      data,
      createdBy,
      transactionEntityManager,
    );
  }

  simpleTest() {
    console.log('you can use the employee service');
  }
}
