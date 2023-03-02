import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { AppService } from 'src/app.service';

@Module({
  providers: [RegisterService, AppService],
  controllers: [RegisterController]
})
export class RegisterModule {}
