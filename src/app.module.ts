import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { ApiV1Module } from './api/v1/api.v1.module';
import { AuthPassportModule } from './core/common/auth/auth.passport.module';
import { ConfigModule } from '@nestjs/config';
import { LocaleModule } from './core/common/locale/locale.module';
import { Module } from '@nestjs/common';
import { TypeOrmDatabaseModule } from './core/common/database/typeorm/typeorm.module';
import { MailerModule } from './core/common/mailer/mailer.module';
import * as path from 'path';
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
		ApiV1Module,
		ConfigModule,
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
			load: [
				app,
				database,
				email,
				auth,
				cors,
			],
		}),
		I18nModule.forRoot({
			fallbackLanguage: 'en',
			loaderOptions: {
				path: path.join(__dirname, '/core/resources/lang/'),
				watch: true,
			},
			resolvers: [
				{ use: QueryResolver, options: ['lang', 'lng', 'l', 'locale'] },
				AcceptLanguageResolver,
			],
		}),
	],
})
export class AppModule { }
