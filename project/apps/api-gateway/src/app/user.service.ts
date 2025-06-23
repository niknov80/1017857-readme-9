import 'multer';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@project/authentication';
import FormData from 'form-data';
import { ApplicationServiceURL } from './app.config';

@Injectable()
export class UsersService {
  constructor(private readonly httpService: HttpService) {}

  public async registerWithAvatar(dto: Omit<CreateUserDto, 'avatar'>, file?: Express.Multer.File) {
    let avatarUrl: string | undefined;

    if (file) {
      const formData = new FormData();
      formData.append('file', file.buffer, file.originalname);

      const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Files}/upload`, formData, {
        headers: formData.getHeaders(),
      });

      avatarUrl = data.url || data.path;
    }

    const finalDto: CreateUserDto = {
      ...dto,
      avatar: avatarUrl,
    };

    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/register`, finalDto);
    return data;
  }
}
