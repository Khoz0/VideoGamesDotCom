import { Logger, Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostDao } from './dao/post.dao';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './schemas/post.schema';
import { PostService } from './post.service';
import { PeopleModule } from '../people/people.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    PeopleModule,
  ],
  providers: [PostService, PostDao, Logger],
  controllers: [PostController],
})
export class PostModule {}
