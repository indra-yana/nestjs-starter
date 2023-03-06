import { LocalStrategyService } from 'src/core/common/auth/local.strategy.service';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JWTStrategyService } from 'src/core/common/auth/jwt.strategy.service';

@Module({
  imports: [
    UserModule, 
    PassportModule, 
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_KEY || 'secret_key',
      signOptions: { expiresIn: process.env.ACCESS_TOKEN_AGE || '60s' },
    })
  ],
  exports: [LoginService],
  providers: [LoginService, LocalStrategyService, JWTStrategyService],
  controllers: [LoginController]
})
export class LoginModule {}
