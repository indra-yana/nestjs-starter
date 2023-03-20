import { ForgotPasswordService } from './forgot-password.service';
import { Module } from '@nestjs/common';
import { PasswordController } from './password.controller';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordReset } from 'src/core/common/database/typeorm/entities/password-reset';

@Module({
	imports: [
		UserModule,
		TypeOrmModule.forFeature([PasswordReset]),
	],
	exports: [ForgotPasswordService],
	providers: [ForgotPasswordService],
	controllers: [PasswordController],
})
export class PasswordModule {}
