<<<<<<< HEAD
import { Injectable } from '@nestjs/common';
import { UserService } from '../../module/user/user.service';
import { JwtService } from '@nestjs/jwt';
=======
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../module/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'

>>>>>>> 3eaa42fa177de6064ae97b59e6557cfea92fcb84

@Injectable()
export class AuthService {
  constructor(
<<<<<<< HEAD
    private UserService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.UserService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
=======
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
>>>>>>> 3eaa42fa177de6064ae97b59e6557cfea92fcb84
    return null;
  }
  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
<<<<<<< HEAD
      access_token: this.jwtService.sign(payload),
=======
      access_token: this.JwtService.sign(payload),
>>>>>>> 3eaa42fa177de6064ae97b59e6557cfea92fcb84
    };
  }
}
