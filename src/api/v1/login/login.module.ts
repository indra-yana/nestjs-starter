import { LocalStrategyService } from 'src/core/common/auth/local.strategy.service';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, PassportModule],
  exports: [LoginService],
  providers: [LoginService, LocalStrategyService],
  controllers: [LoginController]
})
export class LoginModule {}
