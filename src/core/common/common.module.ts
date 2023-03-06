import { Global, Module } from '@nestjs/common';
import { LocaleService } from './service/locale.service';
import { TypeOrmDatabaseModule } from './database/typeorm/typeorm.module';

@Global()
@Module({
    imports: [
        TypeOrmDatabaseModule
    ],
    providers: [LocaleService],
    exports: [LocaleService]
})
export class CommonModule { }
