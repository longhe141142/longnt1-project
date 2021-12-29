import { Injectable, BadRequestException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from '../../auth/auth/dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repostories';
import { Connection } from 'typeorm';
import { ResponseSuccess } from '../../common/interfaces/response.interface';
import {
  EntityManager,
  Repository,
  Transaction,
  TransactionManager,
} from 'typeorm';
import { EmployeeService } from '../employee/employee.service';

export type User = any;
import {
  ErrorMessage,
  CodeName,
} from '../../common/constants/common.constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly employeeService: EmployeeService,
    private readonly connection: Connection,
  ) {}
  async create(payload: Object) {
    let data = await this.userRepository.insertUser(payload);
    return data instanceof Error
      ? new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: ErrorMessage.USER_EXISTED,
          codeName: CodeName.USER_EXISTED,
        })
      : new ResponseSuccess({
          data,
        });
  }

  findAll() {
    return `This action returns all user`;
  }

  async findByUserName(userName: string): Promise<any> {}

  getUserByUserName = async (username: string) => {
    return await this.userRepository.getUserByUserName(username);
  };

  getOneAccount(user: string, password: string) {}

  async checkUserExist(userName: string) {
    return await this.userRepository.checkUserExist(userName);
  }

  checkEmailExist = async (email: string) => {
    return await this.userRepository.checkEmailExist(email);
  };

  async createUser(data: Partial<CreateUserDto>) {
    this.employeeService.simpleTest();
    let ret = this.connection.transaction(async (manager) => {
      return this.userRepository.createNewUser(manager, data);
    });
    console.log(ret);

    return ret instanceof Error
      ? new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: ErrorMessage.USER_EXISTED,
          codeName: CodeName.USER_EXISTED,
        })
      : new ResponseSuccess({
          data: ret,
        });
  }
}
