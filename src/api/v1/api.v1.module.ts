import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from 'src/core/common/common.module';
import { AppModule } from './main/app.module';
import { RegisterModule } from './register/register.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        ConfigModule,
        CommonModule,
        AppModule, 
        UserModule,
        RegisterModule,
    ],
})
export class ApiV1Module { }
