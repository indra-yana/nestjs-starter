import { AuthService } from '../../../core/common/auth/auth.service';
import { Controller, HttpCode, Post, UseGuards, Request, Get, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { EMSAuthGuard } from 'src/core/common/auth/guards/ems.guard';
import { PublicRoute } from 'src/core/decorator/public-route.decorator';

@UseInterceptors(ClassSerializerInterceptor)
@Controller({
    path: 'auth',
    version: '1'
})
export class LoginController {
    constructor(private authService: AuthService) { }

    @UseGuards(EMSAuthGuard)
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
