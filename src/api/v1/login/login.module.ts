import { LoginController } from './login.controller';
import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule, 
  ],
  exports: [],
  providers: [],
  controllers: [LoginController]
})
export class LoginModule {}
