import {
  EntityRepository,
  Repository,
  SelectQueryBuilder,
  EntityManager,
} from 'typeorm';
import { Employee } from '../../../entities/employee';
import { userInformationDto } from '../../../auth/auth/dto';

@EntityRepository(Employee)
export class EmployeeRepository extends Repository<Employee> {
  async createEmployee(
    data: userInformationDto,
    createdBy: string,
    transactionEntityManager: EntityManager = null,
  ) {
    let employee = new Employee({ ...data, createdBy, updatedBy: createdBy });
    if (!transactionEntityManager) {
      await this.save(employee);
    } else {
      await transactionEntityManager.save(employee);
    }
    return employee;
  }
}
