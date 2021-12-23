import { Injectable } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repostories';
export type User = any;

@Injectable()
export class UserService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}
  async create(userName: string, password: string,email:string, payload: Object) {
    let data = await this.userRepository.insertUser(userName,password,email,payload);
    return {
      data:data
    };
  }

  async findOne(username: string): Promise<any | undefined> {
    return this.users.find(user => user.username === username);
  }
  findAll() {
    return `This action returns all user`;
  }

  async findByUserName(userName:string):Promise<any>{
     
  }


   getUserByUserName = async (username:string)=>{
      return await this.userRepository.getUserByUserName(username)
   }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  getOneAccount(user: string, password: string) {}
}
