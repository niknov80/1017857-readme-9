import { Module } from '@nestjs/common';
import { BlogUserModule } from '@project/blog-user';
import { PrismaClientModule } from '@project/models';
import { UserSubscriptionController } from './user-subscription.controller';
import { UserSubscriptionFactory } from './user-subscription.factory';
import { UserSubscriptionRepository } from './user-subscription.repository';
import { UserSubscriptionService } from './user-subscription.service';

@Module({
  imports: [PrismaClientModule, BlogUserModule],
  providers: [UserSubscriptionRepository, UserSubscriptionFactory, UserSubscriptionService],
  controllers: [UserSubscriptionController],
  exports: [UserSubscriptionRepository, UserSubscriptionService],
})
export class UserSubscriptionModule {}
