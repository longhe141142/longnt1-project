import { ValidatorModule } from './module/validator/validator.module';
import {forwardRef, Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './common/config/db.config';
import { UserModule } from './module/user/user.module';
import { RoleModule } from './module/role/role.module';
import { AdminModule } from './module/admin/admin.module';
import { AuthModule } from './module/auth/auth.module';
import { EmployeeModule } from './module/employee/employee.module';
import { WinstonModule } from 'nest-winston';
import { LoggerConfig } from './common/config/logger/logger.config';
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "./auth/constant";
import {JwtStrategy} from "./auth/strategy/jwt.strategy";
import {LocalStrategy} from "./auth/strategy/local.strategy";
import {LocalStrategy2} from "./auth/strategy/local2.strategy";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    WinstonModule.forRoot(LoggerConfig),
    UserModule,
    RoleModule,
    AdminModule,
    ValidatorModule,
    EmployeeModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}
