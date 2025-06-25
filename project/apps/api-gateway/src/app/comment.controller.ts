import { HttpService } from '@nestjs/axios';
import { Body, Controller, Delete, Get, Headers, Param, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { CreateCommentDto } from '@project/comment';
import { Request } from 'express';
import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios.exception';
import { CheckAuthGuard } from './guards/check-auth.guard';

@Controller('comments')
@UseFilters(AxiosExceptionFilter)
export class CommentsController {
  constructor(private readonly httpService: HttpService) {}

  @UseGuards(CheckAuthGuard)
  @Post()
  public async create(@Body() dto: CreateCommentDto, @Headers('authorization') authHeader: string) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Comments}`, dto, {
      headers: { Authorization: authHeader },
    });
    return data;
  }

  @Get('post/:postId')
  public async findAll(@Param('postId') postId: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Comments}/post/${postId}`);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @Delete(':id')
  public async delete(@Param('id') id: string, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Comments}/${id}`, {
      headers: {
        Authorization: req.headers['authorization'] || '',
      },
    });
    return data;
  }
}
