import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationModule } from '@project/authentication';
import { BlogUserModule } from '@project/blog-user';
import { UserConfigModule } from '@project/config';
import { PrismaClientModule } from '@project/models';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['libs/user/models/.env', 'apps/user/user.env', '.env'],
      isGlobal: true,
    }),
    PrismaClientModule,
    BlogUserModule,
    AuthenticationModule,
    UserConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
