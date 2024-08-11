import { Injectable } from '@nestjs/common';
import { joiValidationFormat } from 'src/core/helper/helper';
import { JwtService } from '@nestjs/jwt';
import { LocaleService } from 'src/core/common/locale/locale.service';
import { LoginDto } from 'src/api/v1/ems/login/dto/login.dto';
import AuthenticationException from 'src/core/exceptions/AuthenticationException';
import axios from 'axios';
import validateEmail from 'filter-validate-email';

export type EMSAuthResponse = {
    id: number;
    employee_id: number;
    username: string;
    email: string;
}

export type JwtAuthResponse = {
    _uid: number,
    _emplid: number,
    username: string,
    email: string,
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

    async emsAuth(loginDto: LoginDto): Promise<EMSAuthResponse> {
        try {
            const response = await axios.post('http://ras-hrms.test/oauth/token', {
                "grant_type": "password",
                "client_id": "9cbccf7e-c219-4c33-8b10-b08719c36910",
                "client_secret": "VvXD6mufYOheHUtFQgF0VlUcDt0ApftNRFrFIaKJ",
                "username": loginDto.credential,
                "password": loginDto.password,
                "scope": "",
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    // 'x-access-key': 'mqi9qf95jbnleugcph0cu28nul7qiia8'
                }
            });

            console.log(response);            

            // const { id, username, email, employee_id } = response.data;
            // return {
            //     id,
            //     employee_id,
            //     username,
            //     email,
            // };

            return {
                id: 1,
                employee_id: 1,
                username: 'admin.it',
                email: 'admin.it@royalcorp.co.id',
            };
        } catch (error) {
            throw new AuthenticationException({
                message: this.locale.t('app.auth.login_failed'),
                error: joiValidationFormat([
                    {
                        path: ['credential'],
                        message: this.locale.t('app.auth.failed') + `message: ${error.message}`,
                    },
                ]),
                tags: [AuthService.name, 'emsAuth']
            });
        }
    }

    async whoami(payloads: JwtAuthResponse) {
        // TODO: Fetch who am i to ems
        const { _uid, _emplid } = payloads;

        return payloads;
    }

    async jwtAuth(payloads: EMSAuthResponse) {
        const payload: JwtAuthResponse = {
            _uid: payloads.id,
            _emplid: payloads.employee_id,
            username: payloads.username,
            email: payloads.email
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
