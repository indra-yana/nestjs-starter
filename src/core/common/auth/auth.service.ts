import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LocaleService } from 'src/core/common/locale/locale.service';
import validateEmail from 'filter-validate-email';

export type EMSAuthResponse = {
    id: number;
    username: string;
    email: string;
}

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService, 
        private locale: LocaleService,
    ) { }

    credentialField(value: string): string {
        return validateEmail(value, false) ? 'email' : 'username';
    }

    getCredentials(credential: string): object {
        return {
            [this.credentialField(credential)]: credential,
        };
    }

    async whoami(id: string) {      
        // TODO: Fetch who am i to ems
        return {
            id: 1,
            username: 'admin.it',
            email: 'admin.it@royalcorp.co.id',
        };
    }

    async emsAuth(credential: string, password: string) {
        // const credentials = this.getCredentials(credential);  
        // TODO: get user from ems
        // const result = await this.userService.findWithCredential(credentials);
        // if (!result) {
        //     throw new AuthenticationException({
        //         message: this.locale.t('app.auth.login_failed'),
        //         error: joiValidationFormat([
        //             {
        //                 path: ['credential'],
        //                 message: this.locale.t('app.auth.failed'),
        //             },
        //         ]),
        //     });
        // }

        return true;
    }

    async jwtAuth(user: EMSAuthResponse) {
        const payload = { 
            _uid: user.id, 
            username: user.username, 
            email: user.email 
        }

        return {
            token: {
                accessToken: this.jwtService.sign(payload),
                // refreshToken: null,
            }
        }
    }

    verifyJwt(token: string) {
        try {
            const user = this.jwtService.verify(token);            
            return user;
        } catch (error) {
            return null;
        }
    }

}
