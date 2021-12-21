import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repostories';
export type User = any;

@Injectable()
export class UserService {
  private readonly users = [
    {
      userName: 'longnt1',
      password: '12345',
    },
    {
      userName: 'longnt2',
      password: '12345',
    },
    {
      userName: 'longnt3',
      password: '12345',
    },
    {
      userName: 'longnt4',
      password: '12345',
    },
    {
      userName: 'longnt5',
      password: '12345',
    },
  ];
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}
  async create(createUserDto: CreateUserDto) {
    await this.userRepository.insertUser();
    return 'Success!';
  }

  findAll() {
    return `This action returns all user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  async findOne(username: string): Promise<User | undefined> {
    return  this.users.find((user) => user.userName === username);
  }
}
