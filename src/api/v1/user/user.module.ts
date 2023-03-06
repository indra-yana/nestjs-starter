import 'dotenv/config';
import { JwtModule } from '@nestjs/jwt';
import { JWTStrategyService } from 'src/core/common/auth/strategies/jwt.strategy.service';
import { LocalStrategyService } from 'src/core/common/auth/strategies/local.strategy.service';
import { LoginService } from '../login/login.service';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/core/common/database/typeorm/entities/user';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        PassportModule, 
        JwtModule.register({
            secret: process.env.ACCESS_TOKEN_KEY,
            signOptions: { 
              expiresIn: process.env.ACCESS_TOKEN_AGE
            },
        })
    ],
    providers: [UserService, LoginService, LocalStrategyService, JWTStrategyService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule { }
