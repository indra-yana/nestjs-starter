import { AuthService } from 'src/core/common/auth/auth.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FastifyRequest } from 'fastify';
import { LocaleService } from '../../locale/locale.service';
import { OAuth2Client } from 'google-auth-library';
import AuthenticationException from 'src/core/exceptions/AuthenticationException';

@Injectable()
export class GoogleAuthGuard implements CanActivate {

    private google: OAuth2Client;
    
    constructor(
        private readonly configService: ConfigService,
        private readonly authService: AuthService,
        private readonly locale: LocaleService,
    ) {
        console.log(configService.get('auth.google.client_id', { infer: true }));
        
        this.google = new OAuth2Client(
            configService.get('auth.google.client_id', { infer: true }),
            configService.get('auth.google.client_secret', { infer: true }),
        );
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest<FastifyRequest>();  
            const { body } = request;            
            const accessToken = body['access_token'];
            
            this.google.setCredentials({ access_token: accessToken })
            const userInfo = await this.google.request({
                url: 'https://www.googleapis.com/oauth2/v3/userinfo',
            }); 
          
            const user = userInfo?.data;
            if (!user) {
                throw new AuthenticationException({
                    message: this.locale.t('app.auth.login_failed'),
                    tags: [GoogleAuthGuard.name, 'canActivate', 'guard']
                });
            }

            request['user'] = await this.authService.socialAuth(user, 'google');

            return true;
        } catch (error) {
            throw error;
        }
    }
}
