import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [LoginService],
  controllers: [LoginController]
})
export class LoginModule {}
