import {Logger, Module} from '@nestjs/common';
import { ActualitesController } from './actualites.controller';
import {MongooseModule} from "@nestjs/mongoose";
import { ActualitesService } from './actualites.service';
import {ActualitesDao} from "./dao/actualites.dao";
import {ActualitesSchema, Actualites} from "./schemas/actualites.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{name: Actualites.name, schema: ActualitesSchema}]),
  ],
  providers: [ActualitesService, ActualitesDao, Logger],
  controllers: [ActualitesController]
})
export class ActualitesModule {}
