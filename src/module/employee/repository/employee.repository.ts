import {
  EntityRepository,
  Repository,
  SelectQueryBuilder,
  EntityManager,
} from 'typeorm';
import { Employee } from '../../../entities/employee';
import { userInformationDto } from '../../auth/dto';

@EntityRepository(Employee)
export class EmployeeRepository extends Repository<Employee> {
  async createEmployee(
    data: userInformationDto,
    createdBy: string,
    user,
    transactionEntityManager: EntityManager = null,
  ) {
    let employee = new Employee({ ...data, createdBy, updatedBy: createdBy });
    employee.user = user
    if (!transactionEntityManager) {
      await this.save(employee);
    } else {
      console.log("entry here!");
      employee =await transactionEntityManager.save(employee);
    }
    console.log(employee);
    
    return employee;
  }
}
