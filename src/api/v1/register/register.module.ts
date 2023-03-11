import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [],
  controllers: [RegisterController]
})
export class RegisterModule { }
