import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable, Logger } from '@nestjs/common';
import { RabbitRouting } from '@project/core';
import { BlogUserRepository } from '../blog-user.repository';

@Injectable()
export class PostEventsSubscriber {
  private readonly logger = new Logger(PostEventsSubscriber.name);

  constructor(private readonly repo: BlogUserRepository) {}

  @RabbitSubscribe({
    exchange: 'readme.notification',
    routingKey: RabbitRouting.PostCreated,
    queue: 'blog-user.postCreated',
  })
  async handlePostCreated({ userId }: { userId: string }) {
    this.logger.log(`Received content.postCreated for userId: ${userId}`);
    await this.repo.incrementPublicationsCount(userId);
  }

  @RabbitSubscribe({
    exchange: 'readme.notification',
    routingKey: RabbitRouting.PostDeleted,
    queue: 'blog-user.postDeleted',
  })
  async handlePostDeleted({ userId }: { userId: string }) {
    this.logger.log(`Received content.postDeleted for userId: ${userId}`);
    await this.repo.decrementPublicationsCount(userId);
  }
}
