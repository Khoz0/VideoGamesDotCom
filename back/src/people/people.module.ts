import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Person, PersonSchema} from "./schemas/person.schema";

@Module({
  imports: [
     MongooseModule.forFeature([{name: Person.name, schema: PersonSchema}]),
  ],
  controllers: [PeopleController],
  providers: [PeopleService]
})
export class PeopleModule {}
