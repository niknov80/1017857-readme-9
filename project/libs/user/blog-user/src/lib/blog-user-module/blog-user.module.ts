import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { getRabbitMQOptions } from '@project/helpers';
import { PrismaClientModule } from '@project/models';
import { BlogUserFactory } from './blog-user.factory';
import { BlogUserRepository } from './blog-user.repository';
import { PostEventsSubscriber } from './subscriber/post-events.subscriber';

@Module({
  imports: [PrismaClientModule, RabbitMQModule.forRootAsync(getRabbitMQOptions('rabbit'))],
  providers: [BlogUserRepository, BlogUserFactory, PostEventsSubscriber],
  exports: [BlogUserRepository],
})
export class BlogUserModule {}
