import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getRabbitMQOptions } from '@project/helpers';
import { rabbitConfig } from '@project/shared-config';
import { ContentNotifyService } from './content-notify.service';

@Module({
  imports: [ConfigModule.forFeature(rabbitConfig), RabbitMQModule.forRootAsync(getRabbitMQOptions('rabbit'))],
  providers: [ContentNotifyService],
  exports: [ContentNotifyService],
})
export class ContentNotifyModule {}
