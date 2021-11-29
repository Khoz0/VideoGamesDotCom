import {Logger, Module} from '@nestjs/common';
import { DiscussionController } from './discussion.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Person, PersonSchema} from "../people/schemas/person.schema";
import { DiscussionService } from './discussion.service';
import {DiscussionDao} from "./dao/discussion.dao";

@Module({
  imports: [
    MongooseModule.forFeature([{name: Person.name, schema: PersonSchema}]),
  ],
  providers: [DiscussionService, DiscussionDao, Logger],
  controllers: [DiscussionController]
})
export class DiscussionModule {}
