import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { jwtConfig } from '@project/config';
import applicationConfig, { HttpClient } from './app.config';
import { BlogController } from './blog.controller';
import { CommentsController } from './comment.controller';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { LikesController } from './likes.controller';
import { NotificationController } from './notification.controller';
import { UsersService } from './user.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['apps/api-gateway/api-gateway.env'],
      isGlobal: true,
      load: [jwtConfig, applicationConfig],
    }),
    HttpModule.register({
      timeout: HttpClient.Timeout,
      maxRedirects: HttpClient.MaxRedirects,
    }),
  ],
  controllers: [UsersController, BlogController, CommentsController, LikesController, NotificationController],
  providers: [CheckAuthGuard, UsersService],
})
export class AppModule {}
