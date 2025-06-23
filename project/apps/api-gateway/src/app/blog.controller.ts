import { HttpService } from '@nestjs/axios';
import { Body, Controller, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApplicationServiceURL } from './app.config';
import { AddNewPostDto } from './dto/add-new-post';
import { AxiosExceptionFilter } from './filters/axios.exception';
import { CheckAuthGuard } from './guards/check-auth.guard';

@Controller('blog')
@UseFilters(AxiosExceptionFilter)
export class BlogController {
  constructor(private readonly httpService: HttpService) {}

  @UseGuards(CheckAuthGuard)
  @Post('/')
  public async create(@Body() dto: AddNewPostDto, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/`, dto, {
      headers: {
        Authorization: req.headers['authorization'],
      },
    });
    return data;
  }
}
