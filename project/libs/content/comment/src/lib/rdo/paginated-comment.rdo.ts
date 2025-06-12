import { ApiProperty } from '@nestjs/swagger';
import { CommentRdo } from './comment.rdo';

export class PaginatedCommentRdo {
  @ApiProperty({ type: [CommentRdo], description: 'Список комментариев' })
  items: CommentRdo[];

  @ApiProperty({ example: 1, description: 'Текущая страница' })
  page: number;

  @ApiProperty({ example: 50, description: 'Кол-во на страницу' })
  limit: number;

  @ApiProperty({ example: 128, description: 'Всего комментариев' })
  totalCount: number;

  @ApiProperty({ example: 3, description: 'Всего страниц' })
  totalPages: number;
}
