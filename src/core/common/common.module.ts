import { Global, Module } from '@nestjs/common';
import { LocaleService } from './service/locale.service';

@Global()
@Module({
    providers: [LocaleService],
    exports: [LocaleService]
})
export class CommonModule { }
