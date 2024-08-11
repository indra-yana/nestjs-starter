import { APP_GUARD } from '@nestjs/core/constants';
import { EmsModule } from './ems/ems.module';
import { IndexModule } from './index/index.module';
import { JwtAuthGuard } from 'src/core/common/auth/guards/jwt.guard';
import { Module } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Module({
    imports: [
        IndexModule,
        EmsModule,
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
