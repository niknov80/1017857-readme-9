import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Req,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDto, LoginUserDto } from '@project/authentication';
import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios.exception';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { UsersService } from './user.service';

@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/login`, loginUserDto);
    return data;
  }

  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/refresh`, null, {
      headers: {
        Authorization: req.headers['authorization'],
      },
    });

    return data;
  }

  @Post('register')
  @UseInterceptors(FileInterceptor('avatar'))
  public async register(@UploadedFile() avatar: Express.Multer.File, @Body() body: Omit<CreateUserDto, 'avatar'>) {
    return this.usersService.registerWithAvatar(body, avatar);
  }

  @Get(':id')
  public async getUserById(@Param('id') id: string, @Headers('authorization') authHeader: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${id}`, {
      headers: {
        Authorization: authHeader,
      },
    });

    return data;
  }

  @UseGuards(CheckAuthGuard)
  @Post('check')
  public async checkAuth(@Headers('authorization') authHeader: string) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/check`, null, {
      headers: { Authorization: authHeader },
    });
    return data;
  }
}
