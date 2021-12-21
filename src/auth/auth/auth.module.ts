import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
<<<<<<< HEAD
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../constant';

@Module({
  controllers: [AuthController],
  providers: [AuthService]
=======
import { UserModule } from '../../module/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../constants';
import { JwtStrategy } from '../strategy/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
>>>>>>> 3eaa42fa177de6064ae97b59e6557cfea92fcb84
})
export class AuthModule {}
