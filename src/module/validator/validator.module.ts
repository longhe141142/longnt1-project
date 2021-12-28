import { Module } from '@nestjs/common';
import { IsUserAlreadyExistConstraint } from './ValidatorContrait/constrait.interface';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [IsUserAlreadyExistConstraint],
})
export class ValidatorModule {}
