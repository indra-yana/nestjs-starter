import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [RegisterService],
  controllers: [RegisterController]
})
export class RegisterModule { }
