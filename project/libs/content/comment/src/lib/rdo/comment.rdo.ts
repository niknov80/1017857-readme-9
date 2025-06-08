import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CommentRdo {
  @ApiProperty({ description: 'ID комментария' })
  @Expose()
  public id: string;

  @ApiProperty({ description: 'ID поста' })
  @Expose()
  public postId: string;

  @ApiProperty({ description: 'ID автора комментария' })
  @Expose()
  public authorId: string;

  @ApiProperty({ description: 'Текст комментария' })
  @Expose()
  public text: string;

  @ApiProperty({ description: 'Дата создания', type: String, format: 'date-time' })
  @Expose()
  public createdAt: Date;
}
