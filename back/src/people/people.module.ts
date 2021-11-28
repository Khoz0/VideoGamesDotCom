import { Logger, Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Person, PersonSchema } from './schemas/person.schema';
import { PeopleDao } from './dao/people.dao';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Person.name, schema: PersonSchema }]),
    AuthModule,
  ],
  controllers: [PeopleController],
  providers: [PeopleService, PeopleDao, Logger],
})
export class PeopleModule {}
