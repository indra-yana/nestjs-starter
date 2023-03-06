import { Module } from '@nestjs/common';
import { LoginModule } from 'src/api/v1/login/login.module';
import { LocalStrategyService } from './local.strategy.service';

@Module({
    imports: [LoginModule],
    exports: [LocalStrategyService],
    providers: [LocalStrategyService],
})
export class AuthPassportModule {}
