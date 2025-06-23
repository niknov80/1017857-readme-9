import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { rabbitConfig } from '@project/shared-config';
import applicationConfig from './configurations/app.config';
import jwtConfig from './configurations/jwt.config';
import dbConfig from './configurations/postgres.config';

const ENV_USER_FILE_PATH = 'apps/user/user.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [applicationConfig, dbConfig, jwtConfig, rabbitConfig],
      envFilePath: ENV_USER_FILE_PATH,
    }),
  ],
})
export class UserConfigModule {}
