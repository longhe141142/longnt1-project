import { ResponseSuccess } from './../../common/interfaces/response.interface';
import { CreateUserDto, TokenPayload, TokenAndUser } from './dto';
import { UserRepository } from './../user/user.repostories';
import { RefreshToken } from './../../entities/refreshToken';
import { User } from './../../entities/user';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './repository/auth.repository';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  HttpStatus,
  UnprocessableEntityException, forwardRef, Inject,
} from '@nestjs/common';
import { UserService } from '../../module/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { BaseService } from '../../common/base';
// import { SignOptions } from 'jsonwebtoken';
import {
  ErrorMessage,
  CodeName,
} from '../../common/constants/common.constants';
import { SignOptions, TokenExpiredError } from 'jsonwebtoken';

import { Connection, EntityManager } from 'typeorm';
@Injectable()
export class AuthService extends BaseService<RefreshToken> {
  constructor(
    private usersService: UserService,
    @Inject(forwardRef(() => JwtService))
    private readonly JwtService: JwtService,
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository,
    private readonly connection: Connection,
  ) {
    super(authRepository);
  }

  async validateUser(username: string, pass: string): Promise<any> {

    const user = await this.usersService.getUserByUserName(username);

    if (!user) {
      throw new UnauthorizedException('Username or password is incorrect');
    }

    const compareResult = await bcrypt.compare(pass, user.password);
    if (!compareResult) {
      throw new UnauthorizedException('Username or password is incorrect');
    }
    return user;
  }


  async login(body: any) {
    let user = await this.userRepository.getUserByUserName(body.userName);
    if(!user)
      throw new BadRequestException("No user Found!");

    console.log(user,"abc34")
    let data = {
      userName:user.userName,
      email:user.email,
      password:user.password
    }
    let token = await this.generateAccessToken(user)
    console.log(token)
    return {
      access_token: token
    };
  }

  async generateAccessToken(user: User, expiresIn?: Number): Promise<string> {
    const payload = { username: user.userName, userId: user.id };
    console.log(payload);
    const opts: SignOptions = {};
    console.log('access generate token');
    return await this.JwtService.signAsync({ ...payload }, opts);
  }

  async generateRefreshToken(
    user: User,
    expiresIn: number,
    manager?: EntityManager,
  ): Promise<string> {
    let token = await this.authRepository.createRefreshToken(
      user,
      expiresIn,
      manager,
    );
    const payload = { username: user.userName, userId: user.id };
    const opts: SignOptions = {
      expiresIn,
      subject: token.id,
    };
    return await this.JwtService.signAsync({ ...payload }, opts);
  }

  async register(body: Partial<CreateUserDto>) {
    try {
      let rel = await this.connection.transaction(async (manager) => {
        let user = await this.usersService.createUser(body, manager);
        if (user instanceof Error)
          return new BadRequestException({
            statusCode: HttpStatus.BAD_REQUEST,
            message: ErrorMessage.USER_EXISTED,
            codeName: CodeName.USER_EXISTED,
          });
        // let token = await this.generateAccessToken(user);
        // const refresh = await this.generateRefreshToken(
        //   user,
        //   60 * 60 * 24 * 30,
        //   manager,
        // );
        // const payload = this.buildResponsePayload(user, token, refresh);
        // return new ResponseSuccess({
        //   data: payload,
        // });
        return "success!"
      });
      return rel;
    } catch (e) {
      console.log(e);
      return new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: e.message,
        codeName: CodeName.USER_EXISTED,
      });
    }
  }

  private async decodeRefreshToken(token: string): Promise<TokenPayload> {
    try {
      return this.JwtService.verifyAsync(token);
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new UnprocessableEntityException('Refresh token expired');
      } else {
        throw new UnprocessableEntityException('Refresh token malformed');
      }
    }
  }

  async getUserFromTokenPayload(tokenPayload: Partial<TokenPayload>): Promise<User> {
    let userId = tokenPayload.userId;
    if (!userId) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }
    let where = {
      id:userId
    }
    let relations  = ["roles"]
    let user = await this.userRepository.getOneAndRelation(where,relations);
    return user;
  }

  async getRefreshTokenFromDatabase(
    tokenPayload: TokenPayload,
  ): Promise<RefreshToken | null> {
    let tokenId = tokenPayload.sub;
    if (!tokenId) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }
    return await this.authRepository.findOne({
      where: {
        id: tokenId,
      },
    });
  }

  async resolveRefreshToken(t0ken: string): Promise<TokenAndUser> {
    let tokenPayload = await this.decodeRefreshToken(t0ken);
    let user = await this.getUserFromTokenPayload(tokenPayload);
    let token = await this.getRefreshTokenFromDatabase(tokenPayload);
    if (!token) {
      throw new UnprocessableEntityException('Refresh token not found');
    }

    if (token.isRevoked) {
      throw new UnprocessableEntityException('Refresh token revoked');
    }

    if (!user) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }
    return {
      user,
      token,
    };
  }

  async createAccessTokenFromRefreshToken(
    t0ken: string,
  ): Promise<{ user: User; token: string }> {
    let { user } = await this.resolveRefreshToken(t0ken);
    let token = await this.generateAccessToken(user);
    return {
      token,
      user,
    };
  }


  async refreshToken(t0ken: string,){

  }
}
