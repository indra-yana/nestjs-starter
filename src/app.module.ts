import 'dotenv/config';
import "reflect-metadata"
import { ApiV1Module } from './api/v1/api.v1.module';
import { AuthPassportModule } from './core/common/auth/auth.passport.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocaleModule } from './core/common/locale/locale.module';
import { MailerModule } from './core/common/mailer/mailer.module';
import { Module } from '@nestjs/common';
import { StorageModule } from './core/common/storage/storage.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmDatabaseModule } from './core/common/database/typeorm/typeorm.module';
import { ValidatorModule } from './core/common/validator/validator.module';
import app from './core/config/app';
import auth from './core/config/auth';
import cors from './core/config/cors';
import database from './core/config/database';
import email from './core/config/email';
import helmet from './core/config/helmet';
import ratelimiter from './core/config/ratelimiter';
import storage from './core/config/storage';

@Module({
	imports: [
		LocaleModule,
		TypeOrmDatabaseModule,
		AuthPassportModule,
		MailerModule,
		ValidatorModule,
		StorageModule,
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
				helmet,
				storage,
				ratelimiter,
			],
		}),
		ThrottlerModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => configService.get('ratelimiter.default'),
		}),
	],
})
export class AppModule { }
