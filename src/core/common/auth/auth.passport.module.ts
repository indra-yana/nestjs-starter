import { AuthService } from './auth.service';
import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWTStrategyService } from './strategies/jwt.strategy.service';
import { LocaleModule } from '../locale/locale.module';
import { LocalStrategyService } from './strategies/local.strategy.service';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/api/v1/user/user.module';

@Global()
@Module({
    imports: [
        LocaleModule,
        UserModule,
        PassportModule, 
        JwtModule.register({
        secret: process.env.ACCESS_TOKEN_KEY,
        signOptions: { 
            expiresIn: process.env.ACCESS_TOKEN_AGE
        },
        })
    ],
    exports: [AuthService],
    providers: [AuthService, LocalStrategyService, JWTStrategyService],
})
export class AuthPassportModule {}
