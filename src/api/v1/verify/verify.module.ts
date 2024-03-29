import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { VerifyController } from './verify.controller';
import { VerifyService } from './verify.service';

@Module({
    imports: [UserModule],
    exports: [VerifyService],
    providers: [VerifyService],
    controllers: [VerifyController],
})
export class VerifyModule {}
