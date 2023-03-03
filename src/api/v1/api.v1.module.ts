import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppModule } from './main/app.module';
import { RegisterModule } from './register/register.module';

@Module({
    imports: [
        ConfigModule,
        AppModule, 
        RegisterModule
    ],
})
export class ApiV1Module { }
