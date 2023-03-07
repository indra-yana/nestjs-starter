import { PasswordController } from './password.controller';
import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';

@Module({
	imports: [UserModule],
	exports: [],
	providers: [],
	controllers: [PasswordController],
})
export class PasswordModule {}
