import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post as HttpPost, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillDto } from '@project/helpers';
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
   * @param page Номер страницы (по умолчанию 1).
   * @param limit Количество на страницу (по умолчанию 50).
   * @returns Список комментариев.
   */
  @Get('post/:postId')
  @ApiResponse({ status: 200, description: 'Список комментариев', type: [CommentRdo] })
  public async findByPost(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Query('page') page = 1,
    @Query('limit') limit = 50,
  ) {
    const comments = await this.commentService.findByPost(postId, Number(page), Number(limit));
    return comments.map((comment) => fillDto(CommentRdo, comment.toPOJO()));
  }
}
