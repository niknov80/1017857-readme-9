import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Controller, Logger } from '@nestjs/common';
import { RabbitRouting } from '@project/core';
import { CreateSubscriberDto } from '../dto/create-subscriber.dto';
import { MailService } from '../mail-module/mail.service';
import { EmailSubscriberService } from './email-subscriber.service';

@Controller()
export class EmailSubscriberController {
  private readonly logger = new Logger(EmailSubscriberController.name);

  constructor(
    private readonly subscriberService: EmailSubscriberService,
    private readonly mailService: MailService,
  ) {}

  @RabbitSubscribe({
    exchange: 'readme.notification',
    routingKey: RabbitRouting.AddSubscriber,
    queue: 'readme.notification.income',
  })
  public async create(subscriber: CreateSubscriberDto) {
    this.logger.log(`📨 Received new subscriber: ${JSON.stringify(subscriber)}`);

    await this.subscriberService.create(subscriber);
    await this.mailService.sendNotifyNewSubscriber(subscriber);
  }
}
