import { AuthService, GithubAuthResponse } from 'src/core/common/auth/auth.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FastifyRequest } from 'fastify';
import { GithubEmailType } from 'src/core/helper/common-type';
import { LocaleService } from '../../locale/locale.service';
import { SOCIAL_AUTH } from 'src/core/helper/constant';
import AuthenticationException from 'src/core/exceptions/AuthenticationException';
import axios from 'axios';

@Injectable()
export class GithubAuthGuard implements CanActivate {
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
            const userInfo = await axios.get('https://api.github.com/user', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            
            const socialUser: GithubAuthResponse = userInfo?.data || {};            
            if (!socialUser?.email) {
                const userEmailsInfo = await axios.get('https://api.github.com/user/emails', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });

                const emails: GithubEmailType[] = userEmailsInfo?.data || [];
                socialUser.email = emails.filter(item => item.primary === true).map(item => item.email)[0] || '';
            }

            if (!socialUser) {
                throw new AuthenticationException({
                    message: this.locale.t('app.auth.login_failed'),
                    tags: [GithubAuthGuard.name, 'canActivate', 'GithubAuthGuard']
                });
            }

            request['user'] = await this.authService.socialAuth(socialUser, SOCIAL_AUTH.GITHUB);

            return true;
        } catch (error) {
            throw error;
        }
    }
}
