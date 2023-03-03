import { Module } from '@nestjs/common';
import { AppController } from './main/app.controller';
import { AppService } from './main/app.service';
import { RegisterModule } from './register/register.module';

@Module({
    imports: [RegisterModule],
    controllers: [AppController],
    providers: [AppService],
})
export class ApiV1Module {}
