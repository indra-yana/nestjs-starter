import { IndexModule } from './app.module';
import { dirname, join } from 'path';
import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
import { VersioningType } from '@nestjs/common';
import HttpExceptionFilter from './core/filter/http-exception.filter';
import HttpResponseInterceptor from './core/interceptor/http-response.interceptor';

const baseDir = dirname(__dirname);

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    IndexModule,
    new FastifyAdapter()
  );

  app.setGlobalPrefix('api', { exclude: ['/', 'api'] });
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new HttpResponseInterceptor());
  app.useStaticAssets({
		root: join(`${baseDir}/public`),
		prefix: '/public/',
		wildcard: true,
	});

  await app.listen(process.env.APP_PORT || 3000);
  console.log(`Backend server running on: ${await app.getUrl()}`);
}
bootstrap();
