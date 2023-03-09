import { Injectable } from '@nestjs/common';
import { I18nContext, TranslateOptions } from 'nestjs-i18n';

@Injectable()
export class LocaleService {
    t(key: string, options?: any) : string {
        const i18n = I18nContext.current();
        let opts: TranslateOptions = {
            args: {
                ...options
            }
        }

        return i18n.t(key, opts);
    }

    getLang(): string {
        const i18n = I18nContext.current();
        return i18n.lang;
    }
}
