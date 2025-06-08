import { Module } from '@nestjs/common';
import { PrismaContentClientModule } from '@project/content-models';
import { CommentController } from './comment.controller';
import { CommentFactory } from './comment.factory';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';

@Module({
  imports: [PrismaContentClientModule],
  controllers: [CommentController],
  providers: [CommentRepository, CommentFactory, CommentService],
  exports: [CommentService],
})
export class CommentModule {}
