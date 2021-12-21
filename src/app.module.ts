import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './common/config/db.config';
import { UserModule } from './module/user/user.module';
<<<<<<< HEAD
import { AuthModule } from './auth/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UserModule, AuthModule],
=======
import { AuthModule} from './auth/auth/auth.module'

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UserModule,AuthModule],
>>>>>>> 3eaa42fa177de6064ae97b59e6557cfea92fcb84
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
