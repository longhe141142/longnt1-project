import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Inject,
} from '@nestjs/common';
import { UserService } from './user.service';
// import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { BaseController } from '../../common/base/controller';
import { User } from '../../entities/user';

@Controller('user')
export class UserController extends BaseController<User> {
  constructor(
    private readonly userService: UserService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {
    super(userService);
  }

  @Get()
  getOneUser() {
    this.logger.info('this is a log');
    this.logger.warn('this is a log');
    this.logger.error('this is a log');
  }

  @Get('test')
  async test() {
    let where = {
      userName: 'longnt12345',
    };
    return await this.userService.getList([
      this.userService.userRepository.include[0],
    ]);
  }


}
