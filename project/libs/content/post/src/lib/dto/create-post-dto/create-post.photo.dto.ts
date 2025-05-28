import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { PostProperty } from '../../post-module/post.constant';
import { CreatePostBaseDto } from './create-post.base.dto';

export class CreatePhotoPostDto extends CreatePostBaseDto {
  @ApiProperty({
    required: true,
    type: String,
    description: PostProperty.Photo.Id.Description.Description,
  })
  @IsString()
  @IsNotEmpty()
  public photoId: string;
}
