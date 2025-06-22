import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationModule } from '@project/authentication';
import { BlogUserModule } from '@project/blog-user';
import { jwtConfig, UserConfigModule } from '@project/config';
import { PrismaClientModule } from '@project/models';
import { NotifyModule } from '@project/notify';
import { UserSubscriptionModule } from '@project/subscriptions';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['libs/user/models/.env', 'apps/user/user.env', '.env'],
      isGlobal: true,
      load: [jwtConfig],
    }),
    PrismaClientModule,
    BlogUserModule,
    AuthenticationModule,
    UserConfigModule,
    UserSubscriptionModule,
    NotifyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
