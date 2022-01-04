import { Injectable } from '@nestjs/common';
import { userInformationDto } from '../../auth/auth/dto/index';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeRepository } from '../employee/repository/employee.repository';
import { EntityManager } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeRepository)
    private readonly employeeRepository: EmployeeRepository,
  ) {}

  async insertNewEmployee(
    data: userInformationDto,
    createdBy: string,
    user,
    transactionEntityManager: EntityManager = null,
  ) {
    return await this.employeeRepository.createEmployee(
      data,
      createdBy,
      user,
      transactionEntityManager,
    );
  }

  async getEmp() {
    return await this.employeeRepository.find({
      relations: ['user', 'manager'],
    });
  }
}
