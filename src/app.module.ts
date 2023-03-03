import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './api/v1/main/app.controller';
import { AppService } from './api/v1/main/app.service';
import app from './core/config/app';
import database from './core/config/database';
import email from './core/config/email';
import auth from './core/config/auth';
import cors from './core/config/cors';
import { ApiV1Module } from './api/v1/api.v1.module';

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
  ],
})
export class AppModule { }
