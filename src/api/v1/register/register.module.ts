import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { AppService } from 'src/api/v1/main/app.service';

@Module({
  providers: [RegisterService, AppService],
  controllers: [RegisterController]
})
export class RegisterModule {}
