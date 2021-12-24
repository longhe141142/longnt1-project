import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './common/config/db.config';
import { UserModule } from './module/user/user.module';
import { RoleModule } from './module/role/role.module';
import { AuthModule } from './auth/auth/auth.module';
import { WinstonModule } from 'nest-winston';
import { LoggerConfig } from './common/config/logger/logger.config';
// import {format ,myCustomLevels} from './common/config/logger/logger.config'
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    WinstonModule.forRoot(LoggerConfig),
    UserModule,
    AuthModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
