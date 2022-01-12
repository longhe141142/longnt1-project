import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import { jwtConstants } from '../constants';
import {AuthService} from "../../module/auth/auth.service";
import {User} from "../../entities/user";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,"jwtjsonwebtoken") {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any):Promise<User> {
    let data = {
      userId: payload.sub, username: payload.username
    }
    const user = await this.authService.getUserFromTokenPayload(payload);
    if(!user)
      throw new UnauthorizedException("unauthorized")
    return user;
  }
}