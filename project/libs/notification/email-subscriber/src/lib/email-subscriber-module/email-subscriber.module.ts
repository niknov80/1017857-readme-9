import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { getRabbitMQOptions } from '@project/helpers';
import { PrismaNotificationClientModule } from '@project/notification-models';
import { MailModule } from '../mail-module/mail.module';
import { EmailSubscriberController } from './email-subscriber.controller';
import { EmailSubscriberFactory } from './email-subscriber.factory';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { EmailSubscriberService } from './email-subscriber.service';

@Module({
  imports: [
    PrismaNotificationClientModule,
    RabbitMQModule.forRootAsync(getRabbitMQOptions('application.rabbit')),
    MailModule,
  ],
  providers: [EmailSubscriberService, EmailSubscriberFactory, EmailSubscriberRepository],
  controllers: [EmailSubscriberController],
})
export class EmailSubscriberModule {}
