import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LikeRdo {
  @ApiProperty({ description: 'ID лайка' })
  @Expose()
  public id: string;

  @ApiProperty({ description: 'ID поста' })
  @Expose()
  public postId: string;

  @ApiProperty({ description: 'ID пользователя' })
  @Expose()
  public userId: string;

  @ApiProperty({ description: 'Дата создания' })
  @Expose()
  public createdAt: Date;
}
