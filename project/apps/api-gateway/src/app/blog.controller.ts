import { HttpService } from '@nestjs/axios';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseFilters, UseGuards } from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from '@project/post';
import { Request } from 'express';
import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios.exception';
import { CheckAuthGuard } from './guards/check-auth.guard';

@Controller('posts')
@UseFilters(AxiosExceptionFilter)
export class BlogController {
  constructor(private readonly httpService: HttpService) {}

  @UseGuards(CheckAuthGuard)
  @Post()
  public async create(@Body() dto: CreatePostDto, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/`, dto, {
      headers: {
        Authorization: req.headers['authorization'] || '',
      },
    });
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @Put(':id')
  public async update(@Param('id') id: string, @Body() dto: UpdatePostDto, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.put(`${ApplicationServiceURL.Blog}/${id}`, dto, {
      headers: {
        Authorization: req.headers['authorization'] || '',
      },
    });
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @Delete(':id')
  public async delete(@Param('id') id: string, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Blog}/${id}`, {
      headers: {
        Authorization: req.headers['authorization'] || '',
      },
    });
    return data;
  }

  @Get(':id')
  public async getById(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/${id}`);
    return data;
  }

  @Get('feed')
  public async getFeed(@Query('page') page = 1, @Query('limit') limit = 25, @Query('sortBy') sortBy = 'date') {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/feed`, {
      params: { page, limit, sortBy },
    });
    return data;
  }

  @Get('user/:userId')
  public async getByUser(
    @Param('userId') userId: string,
    @Query('page') page = 1,
    @Query('limit') limit = 25,
    @Query('sortBy') sortBy = 'date',
  ) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/user/${userId}`, {
      params: { page, limit, sortBy },
    });
    return data;
  }

  @Get('user/:userId/drafts')
  public async getDrafts(@Param('userId') userId: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/user/${userId}/drafts`);
    return data;
  }

  @Get('tag/:tag')
  public async getByTag(@Param('tag') tag: string, @Query('page') page = 1, @Query('limit') limit = 25) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/tag/${tag}`, {
      params: { page, limit },
    });
    return data;
  }

  @Get('type/:type')
  public async getByType(@Param('type') type: string, @Query('page') page = 1, @Query('limit') limit = 25) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/type/${type}`, {
      params: { page, limit },
    });
    return data;
  }
}
