import { ForgotPasswordService } from './forgot-password.service';
import { Module } from '@nestjs/common';
import { PasswordController } from './password.controller';
import { UserModule } from '../user/user.module';

@Module({
	imports: [UserModule],
	exports: [ForgotPasswordService],
	providers: [ForgotPasswordService],
	controllers: [PasswordController],
})
export class PasswordModule {}
