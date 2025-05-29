import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostFactory } from './post.factory';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';

@Module({
  providers: [PostService, PostRepository, PostFactory],
  exports: [PostService],
  controllers: [PostController],
})
export class PostModule {}
