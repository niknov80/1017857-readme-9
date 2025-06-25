import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { jwtConfig } from '@project/config';
import { EmailSubscriberModule, MailingModule } from '@project/email-subscriber';
import { NotificationConfigModule } from '@project/notification-config';
import { PrismaNotificationClientModule } from '@project/notification-models';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['libs/notification/notification-models/.env', 'apps/notification/notification.env', '.env'],
      isGlobal: true,
      load: [jwtConfig],
    }),
    NotificationConfigModule,
    EmailSubscriberModule,
    MailingModule,
    PrismaNotificationClientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
