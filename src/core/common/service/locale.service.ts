import { Injectable } from '@nestjs/common';
import { I18nContext, I18nService, TranslateOptions } from 'nestjs-i18n';

@Injectable()
export class LocaleService {
    constructor(private lang: I18nService) { }

    t(key: string, options?: TranslateOptions) {
        const i18n = I18nContext.current();
        return this.lang.t(key, { ...options, lang: i18n.lang });
    }
}
