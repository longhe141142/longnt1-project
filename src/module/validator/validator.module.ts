import { Module } from '@nestjs/common';
import { IsUserAlreadyExistConstraint ,IsEmailAlreadyExistConstraint} from './ValidatorContrait/constrait.interface';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [IsUserAlreadyExistConstraint,IsEmailAlreadyExistConstraint],
})
export class ValidatorModule {}
