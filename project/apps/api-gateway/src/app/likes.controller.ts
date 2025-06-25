import { HttpService } from '@nestjs/axios';
import {
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  ParseUUIDPipe,
  Post as HttpPost,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios.exception';
import { CheckAuthGuard } from './guards/check-auth.guard';

@Controller('likes')
@UseGuards(CheckAuthGuard)
@UseFilters(AxiosExceptionFilter)
export class LikesController {
  constructor(private readonly httpService: HttpService) {}

  @HttpPost(':postId')
  public async like(@Param('postId', ParseUUIDPipe) postId: string, @Headers('authorization') authHeader: string) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Likes}/${postId}`, null, {
      headers: { Authorization: authHeader },
    });
    return data;
  }

  @Delete(':postId')
  public async dislike(@Param('postId', ParseUUIDPipe) postId: string, @Headers('authorization') authHeader: string) {
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Likes}/${postId}`, {
      headers: { Authorization: authHeader },
    });
    return data;
  }

  @Get(':postId')
  public async isLiked(@Param('postId', ParseUUIDPipe) postId: string, @Headers('authorization') authHeader: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Likes}/${postId}`, {
      headers: { Authorization: authHeader },
    });
    return data;
  }
}
