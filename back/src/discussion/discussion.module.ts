import {Logger, Module} from '@nestjs/common';
import { DiscussionController } from './discussion.controller';
import {MongooseModule} from "@nestjs/mongoose";
import { DiscussionService } from './discussion.service';
import {DiscussionDao} from "./dao/discussion.dao";
import {Discussion, DiscussionSchema} from "./schemas/discussion.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{name: Discussion.name, schema: DiscussionSchema}]),
  ],
  providers: [DiscussionService, DiscussionDao, Logger],
  controllers: [DiscussionController]
})
export class DiscussionModule {}
