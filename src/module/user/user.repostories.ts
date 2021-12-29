import {
  EntityRepository,
  Repository,
  SelectQueryBuilder,
  EntityManager,
} from 'typeorm';
import { User } from '../../entities/user';
import { CreateUserDto } from '../../auth/auth/dto';
import { EmployeeService } from '../employee/employee.service';
interface partials {
  id: Number;
  name: string;
}

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  constructor(private readonly employeeService: EmployeeService) {
    super();
  }
  insertUser = async (
    payload,
    transactionEntityManager: EntityManager = null,
  ): Promise<User | any> => {
    let user = new User({ ...payload });
    if (!transactionEntityManager) {
      await this.save(user);
    } else {
      await transactionEntityManager.save(user);
    }
    return user;
  };

  getUserByUserName = async (username: string) => {
    return await this.createQueryBuilder('user')
      .select([
        `user.id`,
        `user.email`,
        `user.age`,
        `user.phone`,
        `user.userName`,
        `user.password`,
      ])
      .where('user.userName = :username', { username })
      .getOne();
  };

  getUser = async () => {
    return await this.createQueryBuilder('user').select([
      `user.id`,
      `user.email`,
      `user.age`,
      `user.phone`,
      `user.userName`,
    ]);
  };

  async checkUserExist(userName: string) {
    return !!(await this.findOne({ userName }));
  }

  async checkEmailExist(email: string) {
    return !!(await this.findOne({ email }));
  }

  async createNewUser(
    transactionEntityManager: EntityManager,
    data: Partial<CreateUserDto>,
  ) {
    let createdBy = data.userName;
    let updatedBy = data.userName;

    let user = await this.insertUser(
      {
        ...data,
        createdBy,
        updatedBy,
      },
      transactionEntityManager,
    );
    let { employee: userDetail } = data;
    this.employeeService.simpleTest();
    let employee = await this.employeeService.insertNewEmployee(
      userDetail,
      data.userName,
      transactionEntityManager,
    );
    return {
      user,
      employee,
    };
  }
}
