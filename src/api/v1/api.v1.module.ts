import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from 'src/core/common/common.module';
import { AppModule } from './main/app.module';
import { RegisterModule } from './register/register.module';

@Module({
    imports: [
        ConfigModule,
        CommonModule,
        AppModule, 
        RegisterModule
    ],
})
export class ApiV1Module { }
