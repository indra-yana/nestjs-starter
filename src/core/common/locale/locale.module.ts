import { Global, Module } from '@nestjs/common';
import { I18nModule, QueryResolver, AcceptLanguageResolver } from 'nestjs-i18n';
import { join } from 'path';
import { LocaleService } from './locale.service';

@Global()
@Module({
    imports: [
        I18nModule.forRoot({
			fallbackLanguage: 'en',
			loaderOptions: {
				path: join(__dirname, '../../resources/lang/'),
				watch: true,
			},
			resolvers: [
				{ use: QueryResolver, options: ['lang', 'lng', 'l', 'locale'] },
				AcceptLanguageResolver,
			],
		}),
    ],
    providers: [LocaleService],
    exports: [LocaleService]
})
export class LocaleModule { }
