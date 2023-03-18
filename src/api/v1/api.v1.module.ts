import { APP_GUARD } from '@nestjs/core/constants';
import { IndexModule } from './index/index.module';
import { JwtAuthGuard } from 'src/core/common/auth/guards/jwt.guard';
import { LoginModule } from './login/login.module';
import { Module } from '@nestjs/common';
import { PasswordModule } from './password/password.module';
import { RegisterModule } from './register/register.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { VerifyModule } from './verify/verify.module';
import { FileModule } from './file/file.module';
import { RolesGuard } from 'src/core/common/auth/guards/roles.guard';

@Module({
    imports: [
        IndexModule,
        UserModule,
        RegisterModule,
        LoginModule,
        PasswordModule,
        VerifyModule,
        RoleModule,
        FileModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ]
})
export class ApiV1Module { }
