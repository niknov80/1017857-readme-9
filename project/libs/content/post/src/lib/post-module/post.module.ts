import { Module } from '@nestjs/common';
import { PrismaContentClientModule } from '@project/content-models';
import { PostController } from './post.controller';
import { PostFactory } from './post.factory';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';

@Module({
  imports: [PrismaContentClientModule],
  providers: [PostService, PostRepository, PostFactory],
  exports: [PostService],
  controllers: [PostController],
})
export class PostModule {}
