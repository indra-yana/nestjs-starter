import { Global, Module } from '@nestjs/common';
import { LocaleService } from './locale.service';

@Global()
@Module({
    providers: [LocaleService],
    exports: [LocaleService]
})
export class LocaleModule { }
