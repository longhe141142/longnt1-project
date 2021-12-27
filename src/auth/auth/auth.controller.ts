import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Req,
  Body,
  Render,
  Redirect,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../auth.guard';
import { JwtAuthGuard } from '../jwt.guard';
import { UserService } from '../../module/user/user.service';
import { CreateUserDto } from '../../auth/auth/dto/register.dto';
import {validateOrReject,validate} from 'class-validator'
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly UserService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  // @Render('index.hbs')
  async login(@Request() req) {
    let data = await this.authService.login(req.user);
    return {
      data,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    // this.UserService.testPartial();
    return req.user;
  }

  @Post('register')
  async create(@Req() req, @Body() body:CreateUserDto) {
    let { userName, email, password, ...payload } = body;
    return await this.UserService.create(userName, password, email, payload);
  }
}
