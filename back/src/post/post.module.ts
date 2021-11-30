import {Logger, Module} from '@nestjs/common';
import { PostController } from './post.controller';
import {PostDao} from "./dao/post.dao";
import {MongooseModule} from "@nestjs/mongoose";
import {Post, PostSchema} from "./schemas/post.schema";
import {PostService} from "./post.service";

@Module({
  imports: [
    MongooseModule.forFeature([{name: Post.name, schema: PostSchema}]),
  ],
  providers: [PostService, PostDao, Logger],
  controllers: [PostController]
})
export class PostModule {}
