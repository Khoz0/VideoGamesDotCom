import {Logger, Module} from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Person, PersonSchema} from "./schemas/person.schema";
import {PeopleDao} from "./dao/people.dao";

@Module({
  imports: [
     MongooseModule.forFeature([{name: Person.name, schema: PersonSchema}]),
  ],
  controllers: [PeopleController],
  providers: [PeopleService, PeopleDao, Logger]
})
export class PeopleModule {}
