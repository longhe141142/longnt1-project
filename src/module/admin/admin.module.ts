import {Module} from '@nestjs/common';
import {AdminService} from './admin.service';
import {AdminController} from './admin.controller';
import {UserModule} from '../user/user.module'
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserRepository} from "../user/user.repostories";
import {ValidatorModule} from "../validator/validator.module";

@Module({
    imports: [TypeOrmModule.forFeature([UserRepository]), UserModule, UserModule,],
    controllers: [AdminController],
    providers: [AdminService]
})
export class AdminModule {
}
