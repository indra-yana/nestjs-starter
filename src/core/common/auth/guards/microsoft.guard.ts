import { AuthService, MicrosoftAuthResponse } from 'src/core/common/auth/auth.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FastifyRequest } from 'fastify';
import { LocaleService } from '../../locale/locale.service';
import { SOCIAL_AUTH } from 'src/core/helper/constant';
import AuthenticationException from 'src/core/exceptions/AuthenticationException';
import axios from 'axios';

@Injectable()
export class MicrosoftAuthGuard implements CanActivate {
    constructor(
        private readonly configService: ConfigService,
        private readonly authService: AuthService,
        private readonly locale: LocaleService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest<FastifyRequest>();  
            const { body } = request;
            const accessToken = body['access_token'];
        
            const userInfo = await axios.get('https://graph.microsoft.com/v1.0/me', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
          
            const user: MicrosoftAuthResponse = userInfo.data;
            if (!user) {
                throw new AuthenticationException({
                    message: this.locale.t('app.auth.login_failed'),
                    tags: [MicrosoftAuthGuard.name, 'canActivate', 'guard']
                });
            }

            request['user'] = await this.authService.socialAuth(user, SOCIAL_AUTH.MICROSOFT);

            return true;
        } catch (error) {
            throw error;
        }
    }
}
