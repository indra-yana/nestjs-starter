import { Module } from '@nestjs/common';
import { LoginModule } from 'src/api/v1/login/login.module';
import { JWTStrategyService } from './strategies/jwt.strategy.service';
import { LocalStrategyService } from './strategies/local.strategy.service';

@Module({
    imports: [LoginModule],
    exports: [LocalStrategyService, JWTStrategyService],
    providers: [LocalStrategyService, JWTStrategyService],
})
export class AuthPassportModule {}
