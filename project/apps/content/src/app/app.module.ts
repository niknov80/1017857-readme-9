import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommentModule } from '@project/comment';
import { ContentConfigModule } from '@project/content-config';
import { PrismaContentClientModule } from '@project/content-models';
import { LikeModule } from '@project/like';
import { PostModule } from '@project/post';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['libs/content/content-models/.env', 'apps/content/content.env', '.env'],
      isGlobal: true,
    }),
    PrismaContentClientModule,
    ContentConfigModule,
    PostModule,
    CommentModule,
    LikeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
