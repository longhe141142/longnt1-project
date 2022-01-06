import { User } from './../../../entities/user';
import { RepoBase } from './../../../common/base/repository';
import { RefreshToken } from './../../../entities/refreshToken';
import { EntityRepository, EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';

@EntityRepository(RefreshToken)
@Injectable()
export class AuthRepository extends RepoBase<RefreshToken> {
  constructor() {
    super(RefreshToken, 'refreshToken', []);
  }

  async createRefreshToken(
    user: User,
    ttl: number,
    manager?: EntityManager,
  ): Promise<RefreshToken> {
    let userId = user.id;
    let isRevoked = false;
    let expires = new Date();
    expires.setTime(expires.getTime() + ttl);
    let payload = {
      userId,
      isRevoked,
      expires,
    };
    let token = new RefreshToken({
      ...payload,
    });
    return await (manager ? manager.save(token) : token.save());
  }
}
