import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestFastifyApplication, FastifyAdapter} from "@nestjs/platform-fastify";
import * as Config from 'config';
import {AppConfig, SwaggerConfig} from './app.types';
import {ValidationPipe} from "@nestjs/common";
import {DocumentBuilder} from "@nestjs/swagger";

async function bootstrap(config: AppConfig, swaggerConfig: SwaggerConfig) {
  const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter({ logger: true }),
  );

  // enable CORS for NG Application's calls
  await app.enableCors({ origin: config.cors });

  await app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      })
  )

  const option = new DocumentBuilder()
      .setTitle(swaggerConfig.title)
      .setDescription(swaggerConfig.description)
      .setVersion(swaggerConfig.version)
      .addTag(swaggerConfig.tag)
      .build();

  await app.listen(config.port, config.host);

}
bootstrap(
    Config.get<AppConfig>('server'),
    Config.get<SwaggerConfig>('swagger'),
);
