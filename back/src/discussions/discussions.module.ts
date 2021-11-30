import {Logger, Module} from '@nestjs/common';
import { DiscussionsController } from './discussions.controller';
import {MongooseModule} from "@nestjs/mongoose";
import { DiscussionsService } from './discussions.service';
import {DiscussionDao} from "./dao/discussion.dao";
import {Discussions, DiscussionsSchema} from "./schemas/discussions.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{name: Discussions.name, schema: DiscussionsSchema}]),
  ],
  providers: [DiscussionsService, DiscussionDao, Logger],
  controllers: [DiscussionsController]
})
export class DiscussionsModule {}
