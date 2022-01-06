import { UserRepository } from './../user/user.repostories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from './repository/auth.repository';
import { ValidatorModule } from '../../module/validator/validator.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../../module/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../../auth/strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../auth/constant';
import { JwtStrategy } from '../../auth/strategy/jwt.strategy';
import { EmployeeModule } from '../../module/employee/employee.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthRepository,UserRepository]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      // signOptions: { expiresIn: '600s' },
    }),
    ValidatorModule,
    EmployeeModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports:[AuthService],
})
export class AuthModule {}
