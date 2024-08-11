import { LoginModule } from './login/login.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        LoginModule,
    ],
    providers: []
})
export class EmsModule { }
