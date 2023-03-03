import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
import { VersioningType } from '@nestjs/common';
import FormatResponseInterceptor from './core/interceptor/format-response.interceptor';
import HttpExceptionFilter from './core/filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  app.setGlobalPrefix('api', { exclude: ['/', 'api'] });
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new FormatResponseInterceptor());

  await app.listen(process.env.APP_PORT || 3000);
  console.log(`Backend server running on: ${await app.getUrl()}`);
}
bootstrap();
