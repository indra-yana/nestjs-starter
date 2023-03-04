import { Injectable } from '@nestjs/common';
import { LocaleService } from 'src/core/common/service/locale.service';

@Injectable()
export class RegisterService {
    private readonly users: Array<object> = [];

    constructor(
        private localeService: LocaleService,
    ) { }

    register(body: object) {
        this.users.push(body);

        return this.localeService.t('app.auth.register_success');
    }

    findAll() {
        return this.users;
    }
}
