import { ApiV1Module } from './api/v1/api.v1.module';
import { AuthPassportModule } from './core/common/auth/auth.passport.module';
import { ConfigModule } from '@nestjs/config';
import { LocaleModule } from './core/common/locale/locale.module';
import { MailerModule } from './core/common/mailer/mailer.module';
import { Module } from '@nestjs/common';
import { TypeOrmDatabaseModule } from './core/common/database/typeorm/typeorm.module';
import { ValidatorModule } from './core/common/validator/validator.module';
import app from './core/config/app';
import auth from './core/config/auth';
import cors from './core/config/cors';
import database from './core/config/database';
import email from './core/config/email';

@Module({
	imports: [
		LocaleModule,
		TypeOrmDatabaseModule,
		AuthPassportModule,
		MailerModule,
		ValidatorModule,
		ApiV1Module,
		ConfigModule.forRoot({
			isGlobal: true,
			expandVariables: true,
			cache: process.env.NODE_ENV === 'production',
			envFilePath: '.env',
			load: [
				app,
				database,
				email,
				auth,
				cors,
			],
		}),
	],
})
export class AppModule { }
