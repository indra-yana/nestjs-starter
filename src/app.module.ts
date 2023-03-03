import { Module } from '@nestjs/common';
import { AppController } from './api/v1/main/app.controller';
import { AppService } from './api/v1/main/app.service';
import { RegisterModule } from './api/v1/register/register.module';

@Module({
  imports: [RegisterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
