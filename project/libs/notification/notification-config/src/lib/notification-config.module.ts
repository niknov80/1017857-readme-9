import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import notificationConfig from './configurations/notifications.config';
import postgresConfig from './configurations/postgres.config';

const ENV_NOTIFICATION_FILE_PATH = 'apps/notification/notification.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [notificationConfig, postgresConfig],
      envFilePath: ENV_NOTIFICATION_FILE_PATH,
    }),
  ],
})
export class NotificationConfigModule {}
