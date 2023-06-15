import { AuthService } from '../../../core/common/auth/auth.service';
import { Controller, HttpCode, Post, UseGuards, Request, Get, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { GoogleAuthGuard } from 'src/core/common/auth/guards/google.guard';
import { LocalAuthGuard } from 'src/core/common/auth/guards/local.guard';
import { MicrosoftAuthGuard } from 'src/core/common/auth/guards/microsoft.guard';
import { PublicRoute } from 'src/core/decorator/public-route.decorator';

@UseInterceptors(ClassSerializerInterceptor)
@Controller({
    path: 'auth',
    version: '1'
})
export class LoginController {
    constructor(private authService: AuthService) { }

	@UseGuards(LocalAuthGuard)
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

    @PublicRoute()
    @UseGuards(GoogleAuthGuard)
    @HttpCode(200)
    @Post('login/google')
    async googleLogin(@Request() request: any) {
        try {
            return this.authService.jwtAuth(request.user);
        } catch (error) {
            throw error;
        }
    }

    @PublicRoute()
    @UseGuards(MicrosoftAuthGuard)
    @HttpCode(200)
    @Post('login/microsoft')
    async microsoftLogin(@Request() request: any) {
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
