import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import * as Config from 'config';
import { AppConfig, SwaggerConfig } from './app.types';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PeopleModule } from './people/people.module';
import { GamesModule } from './games/games.module';

async function bootstrap(
  config: AppConfig,
  swaggerConfig: SwaggerConfig,
  swaggerConfigGames: SwaggerConfig,
) {
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
    }),
  );

  const options = new DocumentBuilder()
    .setTitle(swaggerConfig.title)
    .setDescription(swaggerConfig.description)
    .setVersion(swaggerConfig.version)
    .addTag(swaggerConfig.tag)
    .build();

  const peopleDocument = SwaggerModule.createDocument(app, options, {
    include: [PeopleModule],
  });

  SwaggerModule.setup(swaggerConfig.path, app, peopleDocument);

  const secondoptions = new DocumentBuilder()
    .setTitle(swaggerConfigGames.title)
    .setDescription(swaggerConfigGames.description)
    .setVersion(swaggerConfigGames.version)
    .addTag(swaggerConfigGames.tag)
    .build();

  const gamesDocument = SwaggerModule.createDocument(app, secondoptions, {
    include: [GamesModule],
  });

  SwaggerModule.setup(swaggerConfigGames.path, app, gamesDocument);

  await app.listen(config.port, config.host);
}
bootstrap(
  Config.get<AppConfig>('server'),
  Config.get<SwaggerConfig>('swagger_people'),
  Config.get<SwaggerConfig>('swagger_games'),
);
