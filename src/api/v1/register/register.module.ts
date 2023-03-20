import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { UserModule } from '../user/user.module';
import { VerifyModule } from '../verify/verify.module';

@Module({
  imports: [UserModule, VerifyModule],
  providers: [],
  controllers: [RegisterController]
})
export class RegisterModule { }
