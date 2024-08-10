import { AuthService, EMSAuthResponse } from 'src/core/common/auth/auth.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FastifyRequest } from 'fastify';
import { LocaleService } from '../../locale/locale.service';
import { Observable } from "rxjs";
import AuthenticationException from 'src/core/exceptions/AuthenticationException';

@Injectable({})
export class EmsAuthGuard implements CanActivate {
    constructor(
        private readonly locale: LocaleService,
    ) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const request = context.switchToHttp().getRequest<FastifyRequest>();
            const { body, headers } = request;
            const accessToken = body['access_token'];
            const lang = headers['accept-language'];
            // const postData = {
            //     username: body['identity'],
            //     password: body['password'],
            // };
            // const userInfo = await axios.post('https://ems.royalcorp.co.id/api/v1/login', postData, {
            //     headers: {
            //         'Authorization': `Bearer ${accessToken}`,
            //         'Content-Type': 'application/json'
            //     }
            // });

            const user: EMSAuthResponse = null; // userInfo?.data;
            // const user: EMSAuthResponse = {
            //     id: 1,
            //     username: 'admin.it',
            //     email: 'admin.it@royalcorp.co.id',
            // };

            if (!user) {
                throw new AuthenticationException({
                    message: this.locale.t('app.auth.login_failed', { lang }),
                    tags: [EmsAuthGuard.name, 'canActivate', 'EmsAuthGuard']
                });
            }

            request['user'] = user;

            return true;
        } catch (error) {
            throw error;
        }
    }
}
