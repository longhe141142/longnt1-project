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

@Controller('auth')
export class AuthController extends BaseController<RefreshToken> {
  constructor(
    private readonly authService: AuthService,
    private readonly UserService: UserService,
  ) {
    super(authService);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  // @Render('index.hbs')
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
}
