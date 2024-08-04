import { AuthService, EMSAuthResponse, MicrosoftAuthResponse } from 'src/core/common/auth/auth.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FastifyRequest } from 'fastify';
import { LocaleService } from '../../locale/locale.service';
import { SOCIAL_AUTH } from 'src/core/helper/constant';
import AuthenticationException from 'src/core/exceptions/AuthenticationException';
import axios from 'axios';

@Injectable()
export class EMSAuthGuard implements CanActivate {
    constructor(
        private readonly configService: ConfigService,
        private readonly authService: AuthService,
        private readonly locale: LocaleService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest<FastifyRequest>();  
            const { body } = request;
            // TODO: gunakan key identifier
            const accessToken = body['access_token'];
        
            const userInfo = await axios.get('https://ems.royalcorp.co.id/api/v1/login', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
          
            const user: EMSAuthResponse = userInfo.data;
            if (!user) {
                throw new AuthenticationException({
                    message: this.locale.t('app.auth.login_failed'),
                    tags: [EMSAuthGuard.name, 'canActivate', 'EMSAuthGuard']
                });
            }

            request['user'] = user;

            return true;
        } catch (error) {
            throw error;
        }
    }
}
