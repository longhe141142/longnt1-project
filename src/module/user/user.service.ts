import { Injectable, BadRequestException, HttpStatus } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repostories';
import { ResponseSuccess } from '../../common/interfaces/response.interface';

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
  ) {}
  async create(
    userName: string,
    password: string,
    email: string,
    payload: Object,
  ) {
    // if (await this.checkUserExist(userName))
    //   throw new BadRequestException({
    //     statusCode: HttpStatus.BAD_REQUEST,
    //     message: ErrorMessage.USER_EXISTED,
    //     codeName: CodeName.USER_EXISTED,
    //   });

    let data = await this.userRepository.insertUser(
      userName,
      password,
      email,
      payload,
    );

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

  // checkEmailExist = async (email: string) => {
  //   return await this.userRepository.checkEmailExist(email)
  // };
}
