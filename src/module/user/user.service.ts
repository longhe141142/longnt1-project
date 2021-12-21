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
<<<<<<< HEAD
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
=======
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

>>>>>>> 3eaa42fa177de6064ae97b59e6557cfea92fcb84
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}
<<<<<<< HEAD
  async create(createUserDto: CreateUserDto) {
    await this.userRepository.insertUser();
    return 'Success!';
=======
  async create(userName: string, password: string,email:string, payload: Object) {
    let data = await this.userRepository.insertUser(userName,password,email,payload);
    return {
      data:data
    };
>>>>>>> 3eaa42fa177de6064ae97b59e6557cfea92fcb84
  }

  async findOne(username: string): Promise<any | undefined> {
    return this.users.find(user => user.username === username);
  }
  findAll() {
    return `This action returns all user`;
  }

<<<<<<< HEAD
=======
  async findByUserName(userName:string):Promise<any>{
     
  }



>>>>>>> 3eaa42fa177de6064ae97b59e6557cfea92fcb84
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
<<<<<<< HEAD
  async findOne(username: string): Promise<User | undefined> {
    return  this.users.find((user) => user.userName === username);
  }
=======

  getOneAccount(user: string, password: string) {}
>>>>>>> 3eaa42fa177de6064ae97b59e6557cfea92fcb84
}
