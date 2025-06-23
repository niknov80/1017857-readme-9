import { HttpService } from '@nestjs/axios';
import { Body, Controller, Post, Req, UploadedFile, UseFilters, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDto, LoginUserDto } from '@project/authentication';
import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios.exception';
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
}
