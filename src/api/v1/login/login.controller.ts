import { AuthService } from '../../../core/common/auth/auth.service';
import { Controller, HttpCode, Post, UseGuards, Request, Get, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { LocalAuthGuard } from 'src/core/common/auth/guards/local.guard';
import { PublicRoute } from 'src/core/decorator/public-route.decorator';

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
	
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('whoami')
    async whoami(@Request() request: any) {
        try {			
            return request?.user;
        } catch (error) {
            throw error;
        }
    }
}
