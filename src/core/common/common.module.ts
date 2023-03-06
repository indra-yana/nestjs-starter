import { Global, Module } from '@nestjs/common';
import { LocaleService } from './locale/locale.service';
import { TypeOrmDatabaseModule } from './database/typeorm/typeorm.module';
import { AuthPassportModule } from './auth/auth.passport.module';

@Global()
@Module({
    imports: [TypeOrmDatabaseModule, AuthPassportModule],
    providers: [LocaleService],
    exports: [LocaleService]
})
export class CommonModule { }
