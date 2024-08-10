import { AuthService } from '../../../core/common/auth/auth.service';
import { Controller, HttpCode, Post, Request, Get, ClassSerializerInterceptor, UseInterceptors, Body } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { loginSchema } from './login.validator.schema';
import { PublicRoute } from 'src/core/decorator/public-route.decorator';
import { Throttle } from '@nestjs/throttler';
import { ValidatorService } from 'src/core/common/validator/validator.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller({
    path: 'auth',
    version: '1'
})
export class LoginController {
    constructor(
        private authService: AuthService,
        private validator: ValidatorService
    ) { }

    @Throttle({ default: { limit: 3, ttl: 60000 } })
    @PublicRoute()
    @HttpCode(200)
    @Post('login')
    async login(@Body() payloads: LoginDto) {
        try {
            this.validator.schema(loginSchema).validate(payloads);

            const user = await this.authService.emsAuth(payloads);
            return this.authService.jwtAuth(user);
        } catch (error) {
            throw error;
        }
    }

    @Get('whoami')
    async whoami(@Request() request: any) {
        try {
            return request?.user;
        } catch (error) {
            throw error;
        }
    }
}
