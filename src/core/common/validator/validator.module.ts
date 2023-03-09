import { Module } from '@nestjs/common';
import { Global } from '@nestjs/common/decorators';
import { ValidatorService } from './validator.service';

@Global()
@Module({
  exports: [ValidatorService],
  providers: [ValidatorService]
})
export class ValidatorModule {}
