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
    // const user = await this.usersService.findByEmail(email);
    // if (!user) {
    //   throw new UnauthorizedException('Username or password is incorrect');
    // }
    // const compareResult = await bcrypt.compare(password, user.password);

    // if (!compareResult) {
    //   throw new UnauthorizedException('Username or password is incorrect');
    // }

    // return user;
    return null;
  }
  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.JwtService.sign(payload),
    };
  }
}
