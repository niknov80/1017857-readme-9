import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { rabbitConfig } from '@project/config';
import { RabbitRouting } from '@project/core';
import { CreateSubscriberDto } from '../dto/create-subscriber.dto';

@Injectable()
export class NotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbiOptions: ConfigType<typeof rabbitConfig>,
  ) {}

  public async registerSubscriber(dto: CreateSubscriberDto) {
    try {
      await this.rabbitClient.publish(this.rabbiOptions.exchange, RabbitRouting.AddSubscriber, dto);
    } catch (err) {
      console.error('[NotifyService] Failed to publish to RabbitMQ:', err.message);
    }
  }
}
