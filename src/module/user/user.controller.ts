import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Inject, UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {Authorize} from '../../common/constants/common.constants'
// import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { BaseController } from '../../common/base/controller';
import { User } from '../../entities/user';
import {AuthorizeDecorator, Method, Router, URL} from "../../common/decorator";
import {RolesGuard} from "../../auth/guard/roles.guard";
import {JwtAuthGuard} from "../../auth/jwt.guard";
import {AuthGuard} from "@nestjs/passport";

@UseGuards(RolesGuard)
@Router(Authorize.user.ROUTER)
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
  }

  @Get('test')
  @AuthorizeDecorator({
      method:Authorize.user.addEmployee.METHOD,
      url:Authorize.user.addEmployee.URL
  })
  @UseGuards(AuthGuard(["jwtjsonwebtoken"]))
  async test() {
    return await this.userService.getList([
      this.userService.userRepository.include[0],
    ]);
  };
}
