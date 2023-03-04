import { ApiV1Module } from './api/v1/api.v1.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import * as path from 'path';
import app from './core/config/app';
import auth from './core/config/auth';
import cors from './core/config/cors';
import database from './core/config/database';
import email from './core/config/email';
import {
  AcceptLanguageResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';

@Module({
  imports: [
    ApiV1Module,
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
