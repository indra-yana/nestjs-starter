import { ConfigService } from '@nestjs/config';
import { createToken } from 'src/core/helper/helper';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import InvariantException from 'src/core/exceptions/InvariantException';

export enum LINK_TYPE {
    FORGOT_PASSWORD = 1,
    VERIFY = 2,
}

@Injectable()
export class ForgotPasswordService {
    constructor(
        private configService: ConfigService, 
        private userService: UserService
    ) {}

    async generateLink(email: string, type: LINK_TYPE) {
        await this.userService.findOneBy('email', email);
        
        const expires = new Date();
        let feURL = '';
        let expireMinutes = 0;

        if (type == LINK_TYPE.FORGOT_PASSWORD) {
            expireMinutes = expires.getMinutes() + this.configService.get('auth.forgot_password.link_expire_minutes');
            feURL = this.configService.get('auth.forgot_password.frontend_url');
        } else if (type == LINK_TYPE.VERIFY) {
            expireMinutes = expires.getMinutes() + this.configService.get('auth.verify.link_expire_minutes');
            feURL = this.configService.get('auth.verify.frontend_url');
        } else {
            throw new InvariantException({ message: 'Invalid reset link type!' });
        }
        
        expires.setMinutes(expireMinutes);
        const expiresMs = expires.getTime();
        const token = `${expiresMs}#${createToken(email, expiresMs)}`;
        const encodedToken = encodeURIComponent(token);
        const encodedEmail = encodeURIComponent(email);
        
        const link = `${feURL}/${encodedToken}?email=${encodedEmail}`;        
        return link;
    }
}
