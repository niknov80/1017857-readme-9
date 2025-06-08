import { Controller, Delete, Get, Param, ParseUUIDPipe, Post as HttpPost } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
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
   * @returns LikeRdo.
   */
  @HttpPost(':postId')
  @ApiResponse({ status: 201, description: 'Лайк поставлен', type: LikeRdo })
  public async like(@Param('postId', ParseUUIDPipe) postId: string) {
    const userId = 'mock-user-id'; // потом из auth
    const like = await this.likeService.like(postId, userId);
    return fillDto(LikeRdo, like.toPOJO());
  }

  /**
   * Убрать лайк с поста.
   * @param postId ID поста.
   */
  @Delete(':postId')
  @ApiResponse({ status: 204, description: 'Лайк убран' })
  public async dislike(@Param('postId', ParseUUIDPipe) postId: string) {
    const userId = 'mock-user-id'; // потом из auth
    await this.likeService.dislike(postId, userId);
  }

  /**
   * Проверить лайк.
   * @param postId ID поста.
   * @returns { liked: boolean }
   */
  @Get(':postId')
  @ApiResponse({ status: 200, description: 'Результат проверки' })
  public async isLiked(@Param('postId', ParseUUIDPipe) postId: string) {
    const userId = 'mock-user-id'; // потом из auth
    const liked = await this.likeService.isLiked(postId, userId);
    return { liked };
  }
}
