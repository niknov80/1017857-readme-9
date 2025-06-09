import { Module } from '@nestjs/common';
import { PrismaContentClientModule } from '@project/content-models';
import { LikeController } from './like.controller';
import { LikeFactory } from './like.factory';
import { LikeRepository } from './like.repository';
import { LikeService } from './like.service';

@Module({
  imports: [PrismaContentClientModule],
  controllers: [LikeController],
  providers: [LikeRepository, LikeFactory, LikeService],
  exports: [LikeService],
})
export class LikeModule {}
