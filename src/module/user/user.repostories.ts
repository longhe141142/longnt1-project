import { RepoBase } from '../../common/base';
import {
  EntityRepository,
  Repository,
  SelectQueryBuilder,
  EntityManager,
} from 'typeorm';
import { User } from '../../entities/user';
import { CreateUserDto } from '../auth/dto/index';
import { EmployeeService } from '../employee/employee.service';
import { UserService } from './user.service';
interface partials {
  id: Number;
  name: string;
}
import { Injectable } from '@nestjs/common';

@EntityRepository(User)
@Injectable()
export class UserRepository extends RepoBase<User> {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly userService: UserService,
  ) {
    super(User, 'user', ['employeeData', 'employees']);
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

  getUserByUserName = async (
    userName: string,
    transactionEntityManager: EntityManager = null,
  ) => {
    let rel = !transactionEntityManager
      ? await this.findOne({ userName })
      : await transactionEntityManager.findOne(User, userName);
    console.log(rel);
    return rel;
  };

  // getUser = async () => {
  //   return await this.createQueryBuilder('user').select([
  //     `user.id`,
  //     `user.email`,
  //     `user.age`,
  //     `user.phone`,
  //     `user.userName`,
  //   ]);
  // };

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
    return user;
    // let { employee: userDetail } = data;
    // this.userService.findAll();
    // this.employeeService.simpleTest();

    // let employee = await this.employeeService.insertNewEmployee(
    //   userDetail,
    //   data.userName,
    //   transactionEntityManager,
    // );
    // return {
    //   user,
    //   employee,
    // };
  }
  
}
