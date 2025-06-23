import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { jwtConfig } from '@project/config';
import { EmailSubscriberModule } from '@project/email-subscriber';
import { NotificationConfigModule } from '@project/notification-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['libs/notification/notification-models/.env', 'apps/notification/notification.env', '.env'],
      isGlobal: true,
      load: [jwtConfig],
    }),
    NotificationConfigModule,
    EmailSubscriberModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
