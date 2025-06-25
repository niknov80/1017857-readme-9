import { Module } from '@nestjs/common';
import { AuthenticationModule } from '@project/authentication';
import { PrismaContentClientModule } from '@project/content-models';
import { ContentNotifyModule } from '@project/content-notify';
import { PostController } from './post.controller';
import { PostFactory } from './post.factory';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';

@Module({
  imports: [PrismaContentClientModule, AuthenticationModule, ContentNotifyModule],
  providers: [PostService, PostRepository, PostFactory],
  exports: [PostService],
  controllers: [PostController],
})
export class PostModule {}
