import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../module/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'


@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private readonly JwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    console.log(username,pass)
    const user = await this.usersService.getUserByUserName(username);

    if (!user) {
      throw new UnauthorizedException('Username or password is incorrect');
    }

    console.log(user)
    const compareResult = await bcrypt.compare(pass, user.password);
    console.log(compareResult)
    if (!compareResult) {
      throw new UnauthorizedException('Username or password is incorrect');
    }

    return user;
  }
  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.JwtService.sign(payload),
    };
  }
}
