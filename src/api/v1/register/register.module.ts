import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { LocaleService } from '../../../core/common/service/locale.service';

@Module({
  providers: [RegisterService, LocaleService],
  controllers: [RegisterController]
})
export class RegisterModule {}
