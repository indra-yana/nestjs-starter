import { AppModule } from './main/app.module';
import { CommonModule } from 'src/core/common/common.module';
import { ConfigModule } from '@nestjs/config';
import { LoginModule } from './login/login.module';
import { Module } from '@nestjs/common';
import { RegisterModule } from './register/register.module';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core/constants';
import { JwtAuthGuard } from 'src/core/common/auth/jwt-auth.guard';

@Module({
    imports: [
        ConfigModule,
        CommonModule,
        AppModule, 
        UserModule,
        RegisterModule,
        LoginModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ]
})
export class ApiV1Module { }
