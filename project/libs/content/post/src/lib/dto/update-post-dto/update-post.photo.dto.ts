import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { PostProperty } from '../../post-module/post.constant';
import { UpdatePostBaseDto } from './update-post.base.dto';

export class UpdatePhotoPostDto extends UpdatePostBaseDto {
  @ApiProperty({
    required: true,
    type: String,
    description: PostProperty.Photo.Id.Description.Description,
  })
  @IsString()
  @IsNotEmpty()
  public photoId: string;
}
