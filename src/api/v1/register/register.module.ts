import { Module } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';

@Module({
  providers: [RegisterService, UserService],
  controllers: [RegisterController]
})
export class RegisterModule { }
