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
import { DiscussionsModule } from './discussions/discussions.module';
import { PostModule } from './post/post.module';
import { ActualitesModule } from './actualites/actualites.module';

async function bootstrap(
  config: AppConfig,
  swaggerConfig: SwaggerConfig,
  swaggerConfigGames: SwaggerConfig,
  swaggerConfigDiscussions: SwaggerConfig,
  swaggerConfigPosts: SwaggerConfig,
  swaggerConfigActualites: SwaggerConfig,
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

  const thirdoptions = new DocumentBuilder()
    .setTitle(swaggerConfigDiscussions.title)
    .setDescription(swaggerConfigDiscussions.description)
    .setVersion(swaggerConfigDiscussions.version)
    .addTag(swaggerConfigDiscussions.tag)
    .build();

  const discussionsDocument = SwaggerModule.createDocument(app, thirdoptions, {
    include: [DiscussionsModule],
  });

  SwaggerModule.setup(swaggerConfigDiscussions.path, app, discussionsDocument);

  const fourthoptions = new DocumentBuilder()
    .setTitle(swaggerConfigPosts.title)
    .setDescription(swaggerConfigPosts.description)
    .setVersion(swaggerConfigPosts.version)
    .addTag(swaggerConfigPosts.tag)
    .build();

  const postsDocument = SwaggerModule.createDocument(app, fourthoptions, {
    include: [PostModule],
  });

  SwaggerModule.setup(swaggerConfigPosts.path, app, postsDocument);


  const fifthoptions = new DocumentBuilder()
    .setTitle(swaggerConfigActualites.title)
    .setDescription(swaggerConfigActualites.description)
    .setVersion(swaggerConfigActualites.version)
    .addTag(swaggerConfigActualites.tag)
    .build();

  const actualitesDocument = SwaggerModule.createDocument(app, fifthoptions, {
    include: [ActualitesModule],
  });

  SwaggerModule.setup(swaggerConfigActualites.path, app, actualitesDocument);

  await app.listen(config.port, config.host);
}

bootstrap(
  Config.get<AppConfig>('server'),
  Config.get<SwaggerConfig>('swagger_people'),
  Config.get<SwaggerConfig>('swagger_games'),
  Config.get<SwaggerConfig>('swagger_discussions'),
  Config.get<SwaggerConfig>('swagger_posts'),
  Config.get<SwaggerConfig>('swagger_actualites'),
);
