import { APP_GUARD } from '@nestjs/core/constants';
import { IndexModule } from './index/index.module';
import { JwtAuthGuard } from 'src/core/common/auth/guards/jwt.guard';
import { LoginModule } from './login/login.module';
import { Module } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Module({
    imports: [
        IndexModule,
        LoginModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ]
})
export class ApiV1Module { }
