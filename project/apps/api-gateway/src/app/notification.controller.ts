import { HttpService } from '@nestjs/axios';
import { Controller, Logger, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios.exception';
import { CheckAuthGuard } from './guards/check-auth.guard';

@Controller('notification')
@UseFilters(AxiosExceptionFilter)
export class NotificationController {
  private readonly logger = new Logger(NotificationController.name);

  constructor(private readonly httpService: HttpService) {}

  @UseGuards(CheckAuthGuard)
  @Post('digest')
  public async sendDigest(@Req() req: Request) {
    const userId = req.user['sub'];

    this.logger.log(`Starting digest generation for user ID: ${userId}`);

    const [user, posts] = await Promise.all([
      this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${userId}`, {
        headers: { Authorization: req.headers.authorization },
      }),
      this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/user/${userId}`, {
        headers: { Authorization: req.headers.authorization },
      }),
    ]);

    this.logger.log(`Successfully fetched user data and posts`);

    const dto = {
      userId,
      email: user.data.email,
      nickname: user.data.login,
      posts: posts.data.items,
    };

    const { data: response } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Notify}`, dto, {
      headers: {
        Authorization: req.headers['authorization'] || '',
      },
    });

    this.logger.log(`Received response from notification service`);

    return response;
  }
}
