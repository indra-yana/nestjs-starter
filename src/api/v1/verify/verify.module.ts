import { Module } from '@nestjs/common';
import { VerifyController } from './verify.controller';
import { VerifyService } from './verify.service';

@Module({
    imports: [],
    providers: [VerifyService],
    controllers: [VerifyController],
})
export class VerifyModule {}
