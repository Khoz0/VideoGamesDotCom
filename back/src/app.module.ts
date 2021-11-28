import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import { PeopleModule } from './people/people.module';
import { AuthModule } from './auth/auth.module';
import * as Config from 'config'


@Module({
  imports: [MongooseModule.forRoot(Config.get<string>('mongodb.uri')), PeopleModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
