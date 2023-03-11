import { Module } from '@nestjs/common';
import { IndexController } from './index.controller';
import { IndexService } from './index.service';

@Module({
    providers: [IndexService],
    controllers: [IndexController]
})
export class IndexModule { }
