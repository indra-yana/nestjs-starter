import { Injectable } from '@nestjs/common';
import { I18nContext, I18nService, TranslateOptions } from 'nestjs-i18n';

@Injectable()
export class LocaleService {

    constructor(private readonly i18n: I18nService) { }

    t(key: string, options?: TranslateOptions): string {
        let opts: TranslateOptions = {
            lang: options?.lang || this.getLang(),
            args: {
                ...options
            },
        }

        return this.i18n.t(key, opts);
    }

    getLang(): string {
        const i18n = I18nContext.current();
        return i18n?.lang || 'en';
    }
}
