import { LocalStrategyService } from 'src/core/common/auth/strategies/local.strategy.service';
import { LoginController } from './login.controller';
import { AuthService } from '../../../core/common/auth/auth.service';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JWTStrategyService } from 'src/core/common/auth/strategies/jwt.strategy.service';
import 'dotenv/config';

@Module({
  imports: [
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
  controllers: [LoginController]
})
export class LoginModule {}
