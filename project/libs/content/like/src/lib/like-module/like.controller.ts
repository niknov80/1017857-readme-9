import { Controller, Delete, Get, Param, ParseUUIDPipe, Post as HttpPost, Req, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@project/authentication';
import { RequestWithUser } from '@project/core';
import { fillDto } from '@project/helpers';
import { LikeRdo } from '../rdo/like.rdo';
import { LikeService } from './like.service';

@ApiTags('likes')
@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  /**
   * Поставить лайк на пост.
   * @param postId ID поста.
   * @param req Request.
   * @returns LikeRdo.
   */
  @HttpPost(':postId')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 201, description: 'Лайк поставлен', type: LikeRdo })
  public async like(@Param('postId', ParseUUIDPipe) postId: string, @Req() req: RequestWithUser) {
    const userId = req.user.sub;
    const like = await this.likeService.like(postId, userId);
    return fillDto(LikeRdo, like.toPOJO());
  }

  /**
   * Убрать лайк с поста.
   * @param postId ID поста.
   * @param req Request.
   */
  @Delete(':postId')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 204, description: 'Лайк убран' })
  public async dislike(@Param('postId', ParseUUIDPipe) postId: string, @Req() req: RequestWithUser) {
    const userId = req.user.sub;
    await this.likeService.dislike(postId, userId);
  }

  /**
   * Проверить лайк.
   * @param postId ID поста.
   * @param req Request.
   * @returns { liked: boolean }
   */
  @Get(':postId')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Результат проверки' })
  public async isLiked(@Param('postId', ParseUUIDPipe) postId: string, @Req() req: RequestWithUser) {
    const userId = req.user.sub;
    const liked = await this.likeService.isLiked(postId, userId);
    return { liked };
  }
}
