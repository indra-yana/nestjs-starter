import { APP_GUARD } from '@nestjs/core/constants';
import { AppModule } from './main/app.module';
import { JwtAuthGuard } from 'src/core/common/auth/guards/jwt.guard';
import { LoginModule } from './login/login.module';
import { Module } from '@nestjs/common';
import { PasswordModule } from './password/password.module';
import { RegisterModule } from './register/register.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        AppModule, 
        UserModule,
        RegisterModule,
        LoginModule,
        PasswordModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ]
})
export class ApiV1Module { }
