import { AppModule } from './main/app.module';
import { CommonModule } from 'src/core/common/common.module';
import { ConfigModule } from '@nestjs/config';
import { LoginModule } from './login/login.module';
import { Module } from '@nestjs/common';
import { RegisterModule } from './register/register.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        ConfigModule,
        CommonModule,
        AppModule, 
        UserModule,
        RegisterModule,
        LoginModule,
    ],
})
export class ApiV1Module { }
