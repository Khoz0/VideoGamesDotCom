import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Game, GameSchema } from './schemas/game.schema';
import {GamesDao} from "./dao/games.dao";
import {PeopleModule} from "../people/people.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
    PeopleModule,
  ],
  controllers: [GamesController],
  providers: [GamesService, GamesDao],
})
export class GamesModule {}
