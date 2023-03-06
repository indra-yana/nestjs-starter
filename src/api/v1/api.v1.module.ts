import { APP_GUARD } from '@nestjs/core/constants';
import { AppModule } from './main/app.module';
import { JwtAuthGuard } from 'src/core/common/auth/jwt-auth.guard';
import { LoginModule } from './login/login.module';
import { Module } from '@nestjs/common';
import { RegisterModule } from './register/register.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [
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
