import 'dotenv/config';
import "reflect-metadata"
import { ApiV1Module } from './api/v1/api.v1.module';
import { AuthPassportModule } from './core/common/auth/auth.passport.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocaleModule } from './core/common/locale/locale.module';
import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ValidatorModule } from './core/common/validator/validator.module';
import app from './core/config/app';
import auth from './core/config/auth';
import cors from './core/config/cors';
import helmet from './core/config/helmet';
import ratelimiter from './core/config/ratelimiter';

@Module({
	imports: [
		LocaleModule,
		AuthPassportModule,
		ValidatorModule,
		ApiV1Module,
		ConfigModule.forRoot({
			isGlobal: true,
			expandVariables: true,
			cache: process.env.NODE_ENV === 'production',
			envFilePath: '.env',
			load: [
				app,
				auth,
				cors,
				helmet,
				ratelimiter,
			],
		}),
		ThrottlerModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => [
				configService.get('ratelimiter.default')
			],
		}),
	],
})
export class AppModule { }
