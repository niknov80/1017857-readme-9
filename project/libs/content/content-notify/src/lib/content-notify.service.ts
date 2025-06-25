import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { RabbitRouting } from '@project/core';
import { rabbitConfig } from '@project/shared-config';

@Injectable()
export class ContentNotifyService {
  private readonly logger = new Logger(ContentNotifyService.name);

  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof rabbitConfig>,
  ) {}

  public async sendPostCreated({ userId, postId, postTitle }: { userId: string; postId: string; postTitle: string }) {
    this.logger.log(`Publishing event: ${RabbitRouting.PostCreated}`);
    await this.rabbitClient.publish(this.rabbitOptions.exchange, RabbitRouting.PostCreated, {
      userId,
      postId,
      postTitle,
    });
    this.logger.log(`Published event to exchange: ${this.rabbitOptions.exchange}`);
  }

  public async sendPostDeleted(payload: { userId: string }) {
    await this.rabbitClient.publish(this.rabbitOptions.exchange, RabbitRouting.PostDeleted, payload);
  }
}
