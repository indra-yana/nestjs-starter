import { ConfigService } from '@nestjs/config';
import { VersioningType } from '@nestjs/common';
import HttpExceptionFilter from './core/filter/http-exception.filter';
import HttpResponseInterceptor from './core/interceptor/http-response.interceptor';
import { configureFastify, CreateFastifyApplication } from './app.context';

async function bootstrap() {
  const app = await CreateFastifyApplication();
  const configService = app.get<ConfigService>(ConfigService);  
  
  await configureFastify(app, configService);

  app.enableVersioning({ type: VersioningType.URI });
  app.setGlobalPrefix('api', { exclude: ['/', 'api'] });
  app.enableCors(configService.get('cors'));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new HttpResponseInterceptor());

  await app.listen(process.env.APP_PORT || 3000);
  console.log(`Backend server running on: ${await app.getUrl()}`);
}

bootstrap();
