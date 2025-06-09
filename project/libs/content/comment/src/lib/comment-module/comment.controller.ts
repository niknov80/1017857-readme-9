import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post as HttpPost, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillDto } from '@project/helpers';
import { CommentQueryDto } from '../dto/comment-query.dto';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentRdo } from '../rdo/comment.rdo';
import { CommentService } from './comment.service';

@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  /**
   * Создать новый комментарий.
   * @param dto CreateCommentDto.
   * @returns Созданный комментарий.
   */
  @HttpPost()
  @ApiResponse({ status: 201, description: 'Комментарий успешно создан', type: CommentRdo })
  @ApiResponse({ status: 400, description: 'Неверные данные запроса' })
  public async create(@Body() dto: CreateCommentDto) {
    const userId = 'mock-user-id'; // пока заглушка, потом будет auth
    const comment = await this.commentService.create(dto, userId);
    return fillDto(CommentRdo, comment.toPOJO());
  }

  /**
   * Удалить комментарий по id.
   * @param id ID комментария.
   */
  @Delete(':id')
  @HttpCode(204)
  @ApiResponse({ status: 204, description: 'Комментарий успешно удалён' })
  @ApiResponse({ status: 404, description: 'Комментарий не найден' })
  public async delete(@Param('id', ParseUUIDPipe) id: string) {
    const userId = 'mock-user-id'; // пока заглушка, потом будет auth
    await this.commentService.delete(id, userId);
  }

  /**
   * Получить комментарии к посту.
   * @param postId ID поста.
   * @param query
   * @returns Список комментариев.
   */
  @Get('post/:postId')
  @ApiResponse({ status: 200, description: 'Список комментариев с пагинацией' })
  public async findByPost(@Param('postId', ParseUUIDPipe) postId: string, @Query() query: CommentQueryDto) {
    const result = await this.commentService.findByPost(postId, query.page, query.limit);

    return {
      items: result.items.map((comment) => fillDto(CommentRdo, comment.toPOJO())),
      page: result.page,
      limit: result.limit,
      totalCount: result.totalCount,
      totalPages: result.totalPages,
    };
  }
}
