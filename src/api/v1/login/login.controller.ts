import { AuthService } from '../../../core/common/auth/auth.service';
import { Controller, HttpCode, Post, UseGuards, Request, Get, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { EmsAuthGuard } from 'src/core/common/auth/guards/ems.guard';
import { PublicRoute } from 'src/core/decorator/public-route.decorator';

@UseInterceptors(ClassSerializerInterceptor)
@Controller({
    path: 'auth',
    version: '1'
})
export class LoginController {
    constructor(private authService: AuthService) { }

    @Throttle({ default: { limit: 3, ttl: 60000 } })
    @UseGuards(EmsAuthGuard)
    @PublicRoute()
    @HttpCode(200)
    @Post('login')
    async login(@Request() request: any) {
        try {
            return this.authService.jwtAuth(request.user);
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
