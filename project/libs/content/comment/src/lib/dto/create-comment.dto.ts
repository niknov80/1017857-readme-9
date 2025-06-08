import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    required: true,
    type: String,
    description: 'ID поста, к которому добавляется комментарий',
  })
  @IsUUID()
  @IsNotEmpty()
  public postId: string;

  @ApiProperty({
    required: true,
    type: String,
    description: 'Текст комментария (от 10 до 300 символов)',
    minLength: 10,
    maxLength: 300,
  })
  @IsString()
  @Length(10, 300)
  @IsNotEmpty()
  public text: string;
}
