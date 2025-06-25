import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@project/authentication';
import { Post as PostDto } from '@project/core';
import { DigestRequestDto } from '../dto/digest-request.dto';
import { MailingService } from './mailing.service';

@Controller('digest')
export class MailingController {
  constructor(private readonly mailingService: MailingService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async sendDigest(@Body() dto: DigestRequestDto) {
    const posts: PostDto[] = dto.posts.map((post) => ({
      ...post,
      publicationDate: new Date(post.publicationDate),
      createdAt: new Date(post.createdAt),
    }));

    await this.mailingService.sendNewPostsDigest(dto.userId, dto.email, dto.nickname, posts);
    return { status: 'ok' };
  }
}
