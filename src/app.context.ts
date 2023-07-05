import { AppModule } from 'src/app.module';
import { ConfigService } from '@nestjs/config';
import { dirname, join } from 'path';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { NestFactory } from '@nestjs/core';
import fastifyHelmet from '@fastify/helmet';

export async function CreateFastifyApplication(opts: any = {}): Promise<NestFastifyApplication> {
    const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter(opts),
    );

  	return app;
}

export async function configureFastify(
	app: NestFastifyApplication,
	configService?: ConfigService,
) {
	const baseDir = dirname(`${__dirname}`);

  	await app.register(fastifyHelmet, configService.get('helmet'));
	app.useStaticAssets({
		root: join(`${baseDir}/public`),
		prefix: '/public/',
		wildcard: true,
	});
}
