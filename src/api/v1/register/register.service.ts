import { Injectable } from '@nestjs/common';
import { LocaleService } from 'src/core/common/locale/locale.service';
import { UserService } from '../user/user.service';

@Injectable()
export class RegisterService {
    constructor(
        private userService: UserService,
        private locale: LocaleService,
    ) { }

    async register(body: object) {
        this.userService.create(body);

        return this.locale.t('app.auth.register_success');
    }

}
