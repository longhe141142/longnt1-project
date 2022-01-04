import { Controller, Get } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Repository } from 'typeorm';
import { UserRoleRepository } from '../intermediary/repository/user-role.repository';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from 'src/entities/userRole';
@Controller('emp')
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
    @InjectRepository(UserRoleRepository) private readonly Urepository: UserRoleRepository,
  ) {}

  @Get('getOne')
  async getOneEmp() {
    return this.employeeService.getEmp();
  }

  @Get('test')
  test() {
    this.Urepository.test();
  }
}
