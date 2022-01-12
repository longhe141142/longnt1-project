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
  UseFilters,
} from '@nestjs/common';
import {LocalStrategy2} from "../../auth/strategy/local2.strategy";
import { AuthGuard } from '@nestjs/passport';
// import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../../auth/auth.guard';
import { JwtAuthGuard } from '../../auth/jwt.guard';
import { UserService } from '../../module/user/user.service';
import { CreateUserDto } from './dto';
import { validateOrReject, validate } from 'class-validator';
import { HttpExceptionFilter } from '../../utils/http-exception.filter';
import { BaseController } from '../../common/base';
import { RefreshToken } from '../../entities/refreshToken';
import {Roles} from "../../common/decorator";
import {Role} from "../../common/constants/common.constants";

@Controller('auth')
export class AuthController extends BaseController<RefreshToken> {
  constructor(
    private readonly authService: AuthService,
    private readonly UserService: UserService,
  ) {
    super(authService);
  }

  @UseGuards(AuthGuard(["local"]))
  @Post('login')
  async login(@Request() req, @Body() body) {
    let data = await this.authService.login(body);
    return {
      data,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('register')
  @UseFilters(new HttpExceptionFilter())
  async create(@Req() req, @Body() body: CreateUserDto) {
    let rel = await this.authService.register(body);
    return rel;
  }

  @Post('refresh')
  @UseFilters(new HttpExceptionFilter())
  async refreshToken(@Req() req, @Body() body: any) {
    let rel = await this.authService.createAccessTokenFromRefreshToken(
      body.refreshToken,
    );
    let payload = this.authService.buildResponsePayload(rel.user, rel.token);
    return payload;
  }

  @Get("test")
  @Roles(Role.Admin,Role.User)
  async  testFunc(){
    console.log("Entry success!");
  }
}
