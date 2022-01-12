import { UserRepository } from './../user/user.repostories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from './repository/auth.repository';
import { ValidatorModule } from '../../module/validator/validator.module';
import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../../module/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../../auth/strategy/local.strategy';
import {JwtModule, JwtService} from '@nestjs/jwt';
import { jwtConstants } from '../../auth/constant';
import { JwtStrategy } from '../../auth/strategy/jwt.strategy';
import { EmployeeModule } from '../../module/employee/employee.module';
import { LocalStrategy2 } from '../../auth/strategy/local2.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthRepository,UserRepository]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' },
      // secretOrPrivateKey:jwtConstants.secret
    }),
    ValidatorModule,
    EmployeeModule,
    UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, LocalStrategy2],
  exports: [AuthService,JwtStrategy],
})
export class AuthModule {}
